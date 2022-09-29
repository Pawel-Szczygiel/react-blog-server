const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const routerAuth = require('./routes/auth')


app.use(express.json());
app.use('/api',routerAuth);


mongoose.connect(process.env.mongoDb_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(err));
    
    
    
    
    

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
