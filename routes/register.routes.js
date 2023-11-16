const express = require('express');
const {registerUser, loginUser} = require('../controllers/register.controller');
const router = express.Router();

router.patch("/new", registerUser)
router.post("/login", loginUser)


module.exports=router;