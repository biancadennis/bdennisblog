var express = require('express');
var router = express.Router();
var multer = require('multer');
var sharp = require('sharp');
var uploadHandler = multer({dest: 'public/images/blog-images'});
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
router.post('/', uploadHandler.single('image'), function(request, response) {
    Post.create({
        title: request.body.title,
        body: request.body.body,
        slug: request.body.slug,
        imageFilename: (request.file && request.file.filename)
    }).then(function(post){
        sharp(request.file.path)
        .resize(300,300)
        .max()
        .withoutEnlargement()
        .toFile(`${request.file.path}-thumbnail`, function(){
            response.redirect(post.url);
        });
    }).catch(function(error){
        response.render('new', {
            post: request.body,
            errors: error.errors
        });
    });
});

// New
router.get('/new', function(request, response){
    response.render('new');
})
// Delete
router.get('/:slug/delete', function (request,response){
    Post.findOne({
        where: {
            slug:request.params.slug
        }
    }).then(function(post) {
        post.destroy().then(function() {
            response.redirect('/blog');
        })
    })
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