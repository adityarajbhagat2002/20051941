const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const {getOrderedTrain} = require('./Controller/sortingTrains');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(4000,async ()=>{
    console.log('Server started at PORT 4000');

    app.get('/trains',getOrderedTrain);
});
