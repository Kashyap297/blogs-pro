const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/kashblogproj')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
})

const userModel = mongoose.model('users', userSchema)
module.exports = { userModel }