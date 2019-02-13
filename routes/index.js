let data = require('../my-data.json');
let express = require('express');
let router = express.Router();

router.get('/', (req,res,next) => {
    res.render('index', {
        layout:'layout',
        title:'Album Page',
        navHome: true
    })
})

router.get('/contact', (req,res) => {
    res.render('contact', {
        title:'Contact Us',
        layout:'layout'
    })
})

router.get('/login', (req,res) => {
    res.render('login', {
        title:'Login',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
});

const user = {
    email:"test@test.com",
    password:'test'
}

router.post('/login', (req,res) => {
    req.checkBody('email', 'Email is required').isEmail().withMessage('Invalid Email');

    req.checkBody('password','Password is required').notEmpty().withMessage('Password is required').isLength({min:3}).withMessage('Length should be min 5')
    
    var errors = req.validationErrors();

    if(errors) {
        let msgs = errors.map(ele => ele.msg);
        res.render('login', {
            title:'Login',
            layout:'layout-signin',
            extraCss:'<link rel="stylesheet" href="/css/signin.css">',
            messages: msgs
        });
    }else {
        let data = req.body;

        if(data.email == user.email && data.password == user.password) {
           

            res.setHeader('Set-Cookie', "isLoggedIn= true;Max-Age=10; HttpOnly")
            res.redirect('/admin/dashboard')

        }else {
            res.render('login', {
                title:'Login',
                layout:'layout-signin',
                extraCss:'<link rel="stylesheet" href="/css/signin.css">',
                messages: ['Email or Password Wrong']
            });
        }

    }
})

router.get('/signup', (req,res) => {
    res.render('signup', {
        title:'Signup',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/signup',(req,res) => {
    let data = req.body;
    console.log(data);
    res.redirect('/login')
})

module.exports = router;


// module.exports.blogList = (req,res) => {

//     let query = req.query.category
//     let random = Math.floor(Math.random() * data.myBlog.length);

//     res.render('blogs', {
//         title: 'Blog',
//         layout: 'layout',
//         blogs: data.myBlog,
//         blogCategories: data.blogCategories,
//         featuredBlog : data.myBlog[random]
//     })
// // }


// module.exports.adminProjectList = (req,res) => {

//     res.render('admin/project-list', {
//         title:'Project List',
//         layout:'layout-admin',
//         projects : data.myProjects
//     })
// }

// module.exports.adminProjectDetail = (req,res) => {

//     let alias = req.params.alias;

//     let index = data.projectIndex[alias];
//     let project = data.myProjects[index];


//     res.render('admin/project-detail', {
//         title:'Project List',
//         layout:'layout-admin',
//         project: project
//     })
// }