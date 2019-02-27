let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/', (req,res) => {
    let query = req.query.category
    let random = Math.floor(Math.random() * data.myBlog.length);
    res.render('blogs', {
        title: 'Blog',
        layout: 'layout',
        blogs: data.myBlog,
        blogCategories: data.blogCategories,
        featuredBlog : data.myBlog[random]
    })
});


module.exports = router