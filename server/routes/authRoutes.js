const express = require("express");                      //needed to create routes

const { registerUser ,  loginUser, } = require("../controllers/authController");   //This is the function that runs when user hits register API.

const router = express.Router();        //creates mini router object 

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;