const Client = require('node-rest-client').Client;

const client = new Client();



module.exports.getProjectList = (cb) => {
    let apiUrl = 'http://localhost:3002/projects';

    let args = {
        headers: { "Content-Type": "application/json" }
    }

    client.get(apiUrl, args, function(data,response) {
        if(response.statusCode == 200) {
            cb(null, data.data)
        }else {
            cb(data, null)
        }
    })
}


module.exports.getSingleProject = (alias, cb) => {

    let url = `http://localhost:3002/projects/${alias}`;

    let args = {
        headers : { "Content-Type": "application/json" }
    }

    client.get(url, args, function(data, res) {
        if(res.statusCode == 200) {
            cb(null,data.data)
        }else {
            cb(data, null)
        }
    })
}


module.exports.createProject = (data, cb) => {
    let apiUrl = 'http://localhost:3002/projects';

    let args = {
        headers: {
            "Content-Type":"application/json"
        },
        data: data
    }

    client.post(apiUrl, args, function(data, res) {
        if(res.statusCode == 201) {
            cb(null, data.data)
        }else {
            cb(data,null)
        }
    })


}