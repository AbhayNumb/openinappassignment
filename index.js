const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const userroutes = require("./routes/userroutes");
const taskroutes = require("./routes/taskroutes");
const subtaskroutes = require("./routes/subtaskroutes");
const app = express();
const cron = require("node-cron");
const Task = require("./models/task");
const User = require("./models/user");
const twilio = require("twilio");

const port = 3000;
// NK3BTU6UY1ZZ36438Q4DV5FX
// +16185981595

const accountSid = "";
const authToken = "";
const twilioUrl =
  "https://api.twilio.com/2010-04-01/Accounts/" + accountSid + "/Calls.json";

// Connection URI
const uri =
  "mongodb+srv://abhayptsr:openinapp@cluster0.jbo2akp.mongodb.net/openinapp?retryWrites=true&w=majority";

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected!");
    // Start the server after the database connection is established
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });
// Use the userRoutes for the '/api' path
app.use(express.json());
app.use("/api", userroutes);
app.use("/api", taskroutes);
app.use("/api", subtaskroutes);

async function makeCall(phoneNumbers) {
  try {
    for (const phoneNumber of phoneNumbers) {
      console.log("Making call to:", phoneNumber);

      const response = await axios.post(
        twilioUrl,
        new URLSearchParams({
          Url: "http://demo.twilio.com/docs/voice.xml",
          To: phoneNumber.phoneNumber,
          From: "+16067210925",
        }),
        {
          auth: {
            username: accountSid,
            password: authToken,
          },
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      console.log("Call successfully made to:", phoneNumber.phoneNumber);
    }
  } catch (error) {
    console.error("Error making call:", error);
  }
}
oneminute = "*/1 * * * *";
// Define your cron job schedule
cron.schedule(oneminute, async () => {
  // runs every 1 minute
  try {
    // Fetch all pending tasks with due date passed
    const tasks = await Task.find({
      status: "TODO",
      due_date: { $lt: new Date() },
    }).exec();
    console.log("HIII");
    let arr = [];
    for (let i = 0; i < tasks.length; i++) {
      const user = tasks[i].user;
      console.log(user);
      const userInfo = await User.findOne({ username: user }).exec();
      if (userInfo) {
        arr.push({
          phoneNumber: userInfo.phoneNumber,
          priority: userInfo.priority,
        });
      }
    }
    arr.sort((a, b) => a.priority - b.priority);
    // console.log(arr); // Log the array containing user information outside of the loop
    makeCall(arr);
  } catch (error) {
    console.error("Error in cron job:", error);
  }
});
