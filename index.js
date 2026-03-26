require('dotenv').config()
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const authrouter = require('./routes/authrouter')
const auth = require('./middleware/authentication')
const blogrouter = require('./routes/blogrouter')
const notFound = require('./utils/notfound')

// middleware
app.use(bodyparser.json());
app.use(express.json());
 
// routes
app.use('/api/v1/',authrouter);
// app.get('/test', auth, (req,res) =>{
// res.send('passed authentication')
// });

// error routes

app.use('/api/v1/blog', auth, blogrouter);

app.use(notFound);
const start = async ()=>{
    try {
        await mongoose.connect(process.env.dburl)
        app.listen(PORT, ()=>{
            console.log(`server running on port ${PORT}...`);
            
        })
    } catch (error) {
        console.log(error);
        
    }
}
start();