const router = require('express').Router();
let data = require('../my-data.json');


router.get('/dashboard', (req, res) => {
    res.render('admin/dashboard', {
        title: 'DashBoard',
        layout: 'layout-admin'
    })
})

router.get('/projects', (req, res) => {

    console.log(req.get('Cookie'));

    var isLoggedIn  = req.get('Cookie').trim().split('=')[1]

    console.log(isLoggedIn)


    if(isLoggedIn == true) {
        console.log('Inside loggedin')
        res.render('admin/project-list', {
            title: 'Project List',
            layout: 'layout-admin',
            projects: data.myProjects
        })
    }else {
        console.log('else')
        res.redirect('/login')
    }
    
})

module.exports = router;