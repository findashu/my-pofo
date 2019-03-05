let express = require('express');
let router = express.Router();
let data = require('../my-data.json');

let projectService = require('../service/projectService')


router.get('/', (req, res, next) => {

    
    function publicProjectList (err, data) {
        if(err) {
            next(err)
        }else {
            res.render('projects', {
                layout: 'layout',
                title: 'Album Page',
                navProject: true,
                projects: data
            });
        
        }
    }

    projectService.getProjectList(publicProjectList)

});


router.get('/demo/:alias', (req, res) => {
    let alias = req.params.alias;
    res.render('demo', {
        title: 'Project Demo',
        layout: 'layout-demo',
        alias : alias
    })
})

router.get('/:projectAlias', (req, res,next) => {
    let alias = req.params.projectAlias;

    function projectDetail (err, data) {
        if(err) {
            next(err)
        }else {
            res.render('project-detail', {
                title: 'Project Detail',
                layout: 'layout',
                project: data
            })
        }
    }

    projectService.getSingleProject(alias, projectDetail)

    
})


module.exports = router;