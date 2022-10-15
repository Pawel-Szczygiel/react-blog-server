const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


// CREATE POST
router.post('/', async (req,res) => {
    
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        res.status(200).json(newPost);
        
    } catch (error) {
            res.status(500).json(error);
    }

});

//UPDATE POST
router.put('/:id', async (req,res) => {
    try {   
        const post = await Post.findById(req.params.id);
        if (post.username !== req.body.username) {
            return res.status(401).json('You can update only your post!');
        }
            
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            $set: req.body},
            {new: true}
        );

        res.status(200).json(updatedPost);
    } catch (error) {
            res.status(500).json(error);
    }

});

//DELETE POST
router.delete('/:id', async (req,res) => {
    try {   
        const post = await Post.findById(req.params.id);
        if (post.username !== req.body.username) {
            return res.status(401).json('You can delete only your post!');
        }
            
        await post.delete();
        res.status(200).json('Post has been deleted!');
    } catch (error) {
            res.status(500).json(error);
    }

});

//GET POST
router.get('/:id', async (req,res) => {
    try {
        const post = await Post.findById(req.params.id);
        
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});

//GET ALL POST
router.get('/', async (req,res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    console.log(username)
    try {
        let posts;

        if (username) {
            posts = await Post.find({username});
        } else if (catName){
            posts = await Post.find({category: { $in: [catName] }});
        } else {
            posts = await Post.find({});
        }
        
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json(error);
    }
});


module.exports = router;