const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 9000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.set('view engine', 'ejs')


const mongoose = require('mongoose')
const { userModel } = require('./schemas/userschema.js')

var cookieParser = require('cookie-parser')
app.use(cookieParser());


// authentication
const authLogin = (req, res, next) => {
    if (req.cookies.loginUsers) {
        next()
    } else {
        console.log("failure user");
        res.redirect('/login');
    }
}

// home
app.get('/', (req, res) => {
    res.render('./Pages/index')
})

// Blog
app.get('/blogs', authLogin, (req, res) => {
    res.render('./Pages/blog')
})

// register
app.get('/register', (req, res) => {
    res.render('./Pages/register')
})
app.post('/register', async (req, res) => {
    const users = req.body;
    try {
        const register = new userModel(users);
        await register.save();

        res.redirect('/login')
    } catch (err) {
        console.log(err);
    }
})

// login
app.get('/login', (req, res) => {
    res.render('./Pages/login')
})
app.post('/login', async (req, res) => {
    let loginUser = req.body;
    const user = await userModel.findOne({ email: loginUser.email });
    if (user) {
        if (user.password === loginUser.password) {
            res.cookie('loginUsers', user, { maxAge: 900000 })
            console.log('success');
            res.redirect('/blogs')
        } else {
            console.log('fail');
            res.redirect('/login')
        }
    }
})


// logout
app.get('/logout', (req, res) => {
    if (req.cookies.loginUsers) {
        res.clearCookie("loginUsers");
    }
    res.redirect('/')
})

// server
app.listen(port, () => {
    console.log(`server Start at http://localhost:${port}`);
})