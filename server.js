const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const api = require('./app');
const cors = require('cors');



// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use('/api',api);

const port = process.env.PORT || 4008;

app.listen(4008, ()=>{
    console.log('server started');
})