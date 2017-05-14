var express = require('express');
var router = express.Router();

var models = require('../models/index');
var Post = models.post;

//Index
router.get('/', function(request, response){
    Post.findAll().then(function(posts) {
        response.render('blogIndex', {
            posts:posts
        });
    });
});

//Create
router.post('/', function(request, response) {
    Post.create({
        title: request.body.title,
        body: request.body.body,
        slug: request.body.slug
    }).then(function(post){
        response.redirect(post.url);
    })
})

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