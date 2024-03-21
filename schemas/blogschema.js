const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/kashblogproj')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    blogimage: {
        type: String,
        required: true,
    },
    username : {
        type : String,
    }
}, { timestamps: true })

const blogModel = mongoose.model('blog', blogSchema)
module.exports = { blogModel }