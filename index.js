const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/users');


app.use(express.json());
app.use('/api/auth',authRoute);
app.use('/api/users',userRoute);


mongoose.connect(process.env.mongoDb_connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDb'))
    .catch(err => console.log(err));
    
    
app.get('/', (req,res) => {
    res.send('main page')
})    
    
    

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})
