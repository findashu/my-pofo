const router = require('express').Router();
let data = require('../my-data.json');


router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'DashBoard',
        layout: 'layout-admin'
    })
})

router.get('/projects', (req, res) => {
        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'layout-admin',
            projects: data.myProjects
        })
})

module.exports = router;