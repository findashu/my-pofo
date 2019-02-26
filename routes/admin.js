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
   
   Project.find().then(projectList => {
        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'layout-admin',
            projects: projectList
        })
   }).catch(err => next(err))
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
    
    newProject.save().then(projectSaved => {
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})

router.get('/projects/:alias', (req, res) => {
    let alias = req.params.alias;
    
    Project.findOne({alias: alias}).then(data => {
        res.render('admin/project-detail', {
            title: 'Project Detail',
            layout: 'layout-admin',
            project: data
        })
    }).catch(err => next(err))
})

router.get('/projects/:alias/delete', (req,res) => {
    let alias = req.params.alias;

    Project.findOneAndDelete({alias: alias}).then(data => {
        console.log(data)
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})

router.post('/projects/:alias/update', (req,res) => {
    let bodyData = req.body;

    console.log(bodyData)
    let alias = req.params.alias;



    Project.findOneAndUpdate({alias:alias}, {$set:bodyData, $inc:{__v:1}}, {new:true}).then(data =>{
        console.log(data)
        res.redirect('/admin/projects')
    }).catch(err => next(err))
})

module.exports = router;