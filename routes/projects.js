let express = require('express');
let router = express.Router();
let data = require('../my-data.json');


router.get('/', (req, res, next) => {
    let projects = data.myProjects;
    res.render('projects', {
        layout: 'layout',
        title: 'Album Page',
        navProject: true,
        projects: projects
    });
});

router.get('/:projectAlias', (req, res) => {
    let alias = req.params.projectAlias;
    let index = data.projectIndex[alias];
    let project = data.myProjects[index];

    res.render('project-detail', {
        title: 'Project Detail',
        layout: 'layout',
        project: project
    })
})


module.exports = router;