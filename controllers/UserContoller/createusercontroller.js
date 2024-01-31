// controllers/userController.js
const User = require("../../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  const { username, email, password, priority, phoneNumber } = req.body;

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Username or email already exists." });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      priority,
      phoneNumber,
    });

    await newUser.save();

    // // Generate JWT token
    const token = jwt.sign({ userId: newUser.username }, "JWTTOKEN", {
      expiresIn: "1h",
    });

    res.status(201).json({ message: "User created successfully.", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
