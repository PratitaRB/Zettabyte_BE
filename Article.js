const mongoose = require('mongoose');
const Comments = require(__root+'Comment')
const ArticleSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    article : {
        type : String,
        required : true
    },
    comments:[Comments.schema],
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
    }
})

mongoose.model('Article', ArticleSchema);
module.exports = mongoose.model('Article');