const multer = require('multer');
const path = require('path')
const fs = require('fs');

module.exports.uploadMedia = (req,res, dirPath, filename, cb) => {

    fs.mkdirSync(dirPath);

    let storage = multer.diskStorage({
        destination: function(req,file,cb) {
            cb(null, dirPath)
        },
        filename: function(req,file,cb) {
            cb(null, filename)
        } 
    })


    let upload = multer({storage: storage}).single('upload')

    upload(req,res, function(err, data) {
        console.log('upload single')
        if(err) {
            cb(err,null)
            
        } else {
            console.log('uploaded');
            cb(null, data)
        }
    })   
}