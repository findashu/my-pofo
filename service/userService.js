const Client = require('node-rest-client').Client
const client = new Client();

// module.exports.create = (userObj, cb) => {

//     let newUser = new User(userObj);

//     newUser.save().then(data => {
//         cb(null,data)
//     }).catch(err => cb(err, null))
// } 

module.exports.login = (loginObj, cb) => {

    let apiUrl = 'http://localhost:3002/login'

    let args = {
        headers: { "Content-Type": "application/json"},
        data : loginObj
    }

    client.post(apiUrl, args, function(data,resp) {
        if(resp.statusCode == 200) {
            cb(null, data.data)
        }else {
            cb(data, null)
        }
    })    
}