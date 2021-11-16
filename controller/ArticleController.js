const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

const Article = require(__root + 'Article');

router.post('/create', function (req, res) {
    Article.create(req.body)
        .then(article => res.status(200).send(article))
        .catch(error => res.status(400).send("Error , Try Again: " + error.message));
})

router.get('/data', function (req, res){
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 5;
    let query = JSON.stringify(req.query.filter) || {};

    Article.find(query)
        .collation({locale:'en',strength: 2})
        .sort({title:1})
        .skip(page * limit)
        .limit(limit)
        .then(articles =>
            Article.estimatedDocumentCount(query)
                .then(count=>{
                    return{
                        total : count,
                        page : page,
                        pageSize : articles.length,
                        articles : articles
                    }
                }))
        .then(result => res.status(200). send(result))
        .catch(err => res.status(400).send("err: "+err.message))

})

router.post('/comment/create', function (req, res) {
    Article.findByIdAndUpdate(req.query.articleId, {$push: {comments: req.body}}, {new: true})
        .then(article => res.status(200).send(article))
        .catch(error => res.status(400).send("Error , Try Again: " + error.message));
})

router.get('/comment', function (req, res) {
    if (req.query.commentId) {
        Article.findOne({"comments._id": req.query.commentId})
            .then(article => article.comments.find(comment => comment._id == req.query.commentId))
            .then(comment => res.status(200).send(comment))
            .catch(error => res.status(400).send("Error get comment: " + error.message))
    } else {
        Article.findById(req.query.articleId)
            .then(article => res.status(200).send(article.comments))
            .catch(error => res.status(400).send("Error get comment: " + error.message));
    }
})

router.put('/comment', function (req, res) {
    Article.findOneAndUpdate({'comments._id': req.query.commentId}, {
        $set: {
            'comments.$.comment': req.body.comment,
            'comments.$.updated': new Date()
        }
    }, {new: true})
        .then(article => article.comments.find(comment => comment._id == req.query.commentId))
        .then(comment => res.status(200).send(comment))
        .catch(error => res.status(400).send("Updating comment Error: " + error.message));
})

router.delete('/comment', function (req, res){
    Article.findOneAndUpdate({'comments._id': req.query.commentId}, {$pull:{comments:{_id : req.query.commentId}}}, {new : true})
        .then(article => res.status(200).send(article.comments))
        .catch(error => res.status(400).send("Error delete: " + error.message));
})

module.exports = router;