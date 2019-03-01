let data = require('../my-data.json');
let express = require('express');
let router = express.Router();
let userService = require('../service/userService')


router.get('/', (req,res,next) => {
    res.render('index', {
        layout:'layout-index',
        title:'Portfolio - Ashutosh Mishra'
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

let users = [
    {
        name:'Ashu',
        email:"test@test.com",
        password:'test'
    },

    {
        name:'JS',
        email:"js@js.com",
        password:'javascript'
    }
]

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
       
        
        function userLogin (err ,data) {
            if(err) {
                res.render('login', {
                    title:'Login',
                    layout:'layout-signin',
                    extraCss:'<link rel="stylesheet" href="/css/signin.css">',
                    messages: msgs
                });
            }else {
                req.session.isLoggedIn = true;
                req.session.user = data
                res.redirect('/admin/dashboard')
            }
        }

        userService.login(data, userLogin)

    }
})

router.get('/logout', (req,res) => {
    req.session.isLoggedIn = false;
    res.redirect('/')
})


router.get('/signup', (req,res) => {
    res.render('signup', {
        title:'Signup',
        layout:'layout-signin',
        extraCss:'<link rel="stylesheet" href="/css/signin.css">'
    })
})

router.post('/signup',(req,res,next) => {
    let data = req.body;
    
    function signIn (err, data) {
        if(err) {
            next(err)
        }else {
            res.redirect('/login')
        }
    }
    userService.create(data, signIn)
})

module.exports = router;