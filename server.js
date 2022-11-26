const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

let arr = [];
app.get('/index.html', (req, res) => {
    res.send('hi');
})

app.listen(port, () => {
    console.log(`server is running on port num ${port}`);
})