var express = require('express');
var Post = require('../models/post');
var router = express.Router();

//Index
router.get('/', function(request, response){
    response.render('blogIndex')
})

//Create
router.post('/', function (request, response){
    Post.create({
        title: request.body.title,
        body: request.body.body,
        slug: request.body.slug
    }).then(function(post){
        response.redirect(post.url);
    });
});

// New
router.get('/new', function(request, response){
    response.render('new');
})

// Display
router.get('/:slug', function(request, response) {
    Post.findOne({
        where: {
            slug: request.params.slug
        }
    }).then(function(post) {
        response.render('display', {
            post: post
        });
    });
});

module.exports = router;