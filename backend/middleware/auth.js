const express = require('express');
const jwt = require('jsonwebtoken');


//token genrate
const secretKey = "user_can_dance";
const token = jwt.sign(payload, secretKey,{expiresIn:'1min'});

