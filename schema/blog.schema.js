const mongoose = require('mongoose');
const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
	    min: 3,
    },
    content:{
        type: String,
        required: true,
	    min: 10,
        },
    createdAt: {
        type:Date,
        default: Date.now
    },
    updatedAt: {
        type:Date,
        default: Date.now
    },
})



module.exports = mongoose.model('Blog', blogSchema);