const express = require('express');
const app = express();
const reviews = require('./api/reviews.route.js');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/api/v1/reviews', reviews);
app.use('*', (req, res)=>{
    res.status(404).json({error: 'not found'});
})

module.exports = app;


// app.listen(5000, ()=>{
//     console.log('Server is listening on port 5000...');
// })