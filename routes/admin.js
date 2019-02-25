const router = require('express').Router();
let data = require('../my-data.json');
const Project = require('../models/projectSchema')




router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'DashBoard',
        layout: 'layout-admin'
    })
})

router.get('/projects', (req, res, next) => {

    Project.find({}, function(err, projectList) {
       if(err) {
           next(err)
       }else {
        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'layout-admin',
            projects: projectList
        })
       }
    })
})

router.get('/projects/create', (req, res) => {
    res.render('admin/project-create', {
        title: "Create New Project",
        layout: "layout-admin"
    })
})

router.post('/projects/create', (req, res, next) => {
    let data = req.body;

    let alias = data.name.toLowerCase().trim().split(' ').join('-')
    console.log(alias)
    data.alias = alias;

    let newProject = new Project(data);
    
    newProject.save(function(err, data) {
        if(err) {
            next(err)
        }else {
            res.redirect('/admin/projects')
        }
    })
})

router.get('/projects/:alias', (req, res) => {
    let alias = req.params.alias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('admin/project-detail', {
        title: 'Project Detail',
        layout: 'layout-admin',
        project: project
    })
})

module.exports = router;