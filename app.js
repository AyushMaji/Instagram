const express = require('express');
const app = express();
const mongoose = require('mongoose')
const port = 5000;
const{MONGOURI} = require('./keys')


app.use(express.json())
app.use(require('./routes/auth'))




// ==============Database_Connection

mongoose.connect(MONGOURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    );

mongoose.connection.on('connected',()=>{
    console.log("database is connected")
})

// ==============Database_Connection



app.listen(port,()=>{
    console.log("all done")
})
