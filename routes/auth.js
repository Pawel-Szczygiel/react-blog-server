const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

//REGISTER
router.post('/register', async (req,res) => {
    try {
        const {username, email, password } = req.body;

        if (!username) return res.status(400).json({success: false});
        
        const hashedPass = await bcrypt.hash(password,10);

        const newUser = new User({
            username, email, password: hashedPass
        });
        await newUser.save();
        
        res.status(201).json( newUser);
    } catch (error) {
        res.status(500).json(error);
    }
});

//LOGIN
router.post('/login', async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({ username });

        if (!user) return res.status(400).json('Wrong credentials!');
                    
        const validated = await bcrypt.compare(password, user.password);
        if (!validated) return res.status(400).json('Wrong credentials!');
                    
        const { password: pass , ...others } = user._doc;
        res.status(200).json(others);

    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;