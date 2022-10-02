const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');
const postRoute = require('./routes/posts');
const categoriesRoute = require('./routes/categorys');
const multer = require('multer');

mongoose.connect(process.env.mongoDb_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(err));
    

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    }
});

const upload = multer(storage);
app.post('/api/upload', upload.single('file'), (req,res) => {
    res.status(200).json('file hass been uploaded');
});

app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);
app.use('/api/posts',postRoute);
app.use('/api/categories', categoriesRoute);

    

    

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
