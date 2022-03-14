const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req,res) => {
    res.send('Health check ok');
});

app.get('/quakes', (req,res) => {
    res.send('quakes ok');
});


app.listen(port, () => {
    console.log("listening on ", port);
});