const Project = require('../models/projectSchema');


module.exports.getProjectList = (cb) => {
    
    Project.find().then(data => {

        cb(null, data)


    }).catch(err=> cb(err, null))
}


module.exports.getSingleProject = (alias, cb) => {
    Project.findOne({alias: alias}).then(data => {
        cb(null, data)
    }).catch(err => cb(err, null)) 
}