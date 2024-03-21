const express = require('express');
const app = express();
const port = 9000;

const mongoose = require('mongoose')
const { userModel } = require('./schemas/userschema.js')

app.use(express.static('public'));

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('./Pages/index')
})
app.get('/blogs', (req, res) => {
    res.render('./Pages/blog')
})
app.get('/login', (req, res) => {
    res.render('./Pages/login')
})
app.get('/register', (req, res) => {
    res.render('./Pages/register')
})

app.listen(port, () => {
    console.log(`server Start at http://localhost:${port}`);
})