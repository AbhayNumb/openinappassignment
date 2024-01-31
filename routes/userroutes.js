// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/UserContoller/createusercontroller');
const loginContoller=require("../controllers/UserContoller/loginusercontroller")
const router = express.Router();

router.post('/create-user', userController.createUser);
router.post('/login',loginContoller.loginuser);

module.exports = router;
