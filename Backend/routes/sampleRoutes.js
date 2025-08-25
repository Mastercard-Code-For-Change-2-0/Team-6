const express = require('express');
const router = express.Router();
const Sample = require('../models/sample');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

router.post('/signup', async (req, res) => {
    try {
        const data = req.body;
        const newSample= new Sample(data);

        const response = await newSample.save();
        console.log("✅ Data Saved:", response);


        const payload = {
            id: response.id
        }

        const token = generateToken(payload);
        console.log("Token is:", token);

        res.status(200).json({ response: response, token: token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: "Invalid Data" });
    }
});



router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; //jwt to get the value
        const user = await Sample.findById(userId);

        res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        res.status(500).json({ err: 'Internal Server Error' });
    }
});



module.exports = router;
