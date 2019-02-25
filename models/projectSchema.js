const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const projectSchema = new Schema({
    name: String,
    alias:String,
    tags : [String],
    description:String,
    githubUrl : String,
    imageUrl: String,
    relatedProjects : [{name: String, link:String}]
});


// Returns complete project collection

module.exports = mongoose.model('projects',projectSchema);