const User = require('../models/userSchema')


module.exports.create = (userObj, cb) => {

    let newUser = new User(userObj);

    newUser.save().then(data => {
        cb(null,data)
    }).catch(err => cb(err, null))
} 

module.exports.login = (loginObj, cb) => {

    User.findOne({email:loginObj.email}).then(data => {

        if(data) {
            if(data.password === loginObj.password) {
                cb(null, data)
            }else {
                cb('Password is wrong', null)
            }
        }else {
            cb('User not found with email', null)
        }
    }).catch(err => next(err));
}