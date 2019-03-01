const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new Schema({
    name: {
        type: String, 
        minlength:2, 
        validate:{
            validator: function(value) {
                 // complete logic and then return true or false
                
                return value.length > 3
            },
            message:'Minimum length should be 4'
        },
        required:true
    },
    alias: {type:String, unique:true, required:true},
    tags : [String],
    description:String,
    githubUrl : {type:String, trim:true},
    imageUrl: String,
    relatedProjects : [{name: String, link:String}],
    createdBy : {type:String, enum:['user','admin'], default:'user'},
    createdOn : {type: Date, default: Date.now()},
    updatedOn : {type: Date}
});


// Returns complete project collection

module.exports = mongoose.model('projects',projectSchema);