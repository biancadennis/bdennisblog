var express = require('express');
var models = require('../models/index');
var Project = models.projects;
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

router.post('/', function(request, response){
    Project.create({
        title: request.body.title,
        body: request.body.body,
        slug: request.body.slug
    }).then(function(project) {
        response.redirect(project.url);
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
module.exports = router;