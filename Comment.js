const mongoose = require('mongoose');
const CommentSchema = new mongoose.Schema({
    comment : {
        type : String,
        required : true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
    }
})

mongoose.model('Comment', CommentSchema);
module.exports = mongoose.model('Comment');