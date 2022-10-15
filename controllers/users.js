const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');

const updateUser = async (req,res) => {
    if (req.body.userId !== req.params.id) {
       return res.status(401).json('You can update only your account!');
    }

    if (req.body.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {$set: req.body},
            {new: true}
        );

        res.status(200).json(updatedUser);  
    } catch (error) {
            res.status(500).json(error);
    }

}

const deleteUser = async (req,res) => {
    if (req.body.userId !== req.params.id) {
       return res.status(401).json('You can delete only your account!');
    }
    
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json('User not found');
    
        await Post.deleteMany({username: user.username});
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json('user has been deleted!');  
    } catch (error) {
            res.status(500).json(error);
    }
}

const getUser = async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password, ...others} = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports = {
    updateUser, deleteUser, getUser
}