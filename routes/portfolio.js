var express = require('express');
var multer = require('multer')
var models = require('../models/index');
var Project = models.projects;
var uploadHandler = multer({dest: 'public/images/portfolio-images'});
var sharp = require('sharp');
var router = express.Router();

router.get('/', function (request,response){
    Project.findAll().then(function(projects) {
        response.render('portfolio', {
            projects: projects
        })
    })
})

router.get('/new', function(request, response){
    response.render('new-portfolio-item')
})

router.post('/', uploadHandler.single('image'), function(request, response){
    Project.create({
        title: request.body.title,
        body: request.body.body,
        slug: request.body.slug,
        imageFilename: (request.file && request.file.filename)
    }).then(function(project) {
        sharp(request.file.path)
        .resize(300,300)
        .max()
        .withoutEnlargement()
        .toFile(`${request.file.path}-thumbnail`, function() {
            response.redirect(project.url);
        });
    }).catch(function(error) {
        response.render('new-portfolio-item',{
            post: request.body,
            errors: error.errors
        });
    });
});

router.get('/:slug', function(request, response){
    Project.findOne({
        where: {
            slug: request.params.slug
        }
    }).then(function(project){
        response.render('display-portfolio', {
            project: project
         });
    });
});

router.get('/:slug/delete', function (request,response){
    Project.findOne({
        where: {
            slug:request.params.slug
        }
    }).then(function(project) {
        project.destroy().then(function() {
            response.redirect('/portfolio');
        })
    })
})
module.exports = router;