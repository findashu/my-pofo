const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const validator = require('express-validator');
const session = require('express-session');
const mongoose = require('mongoose');


const app = express();
const appMiddleware = require('./middlewares/appMiddleware');
const index = require('./routes/index');
const projects = require('./routes/projects');
const admin = require('./routes/admin');


app.set('views',__dirname+'/views');
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

mongoose.connect('mongodb://localhost:27017/mean', { useNewUrlParser: true }, function(err,data) {
    if(err) {
        console.log(err)
    }else {
        console.log('DB Connection Successfull')
    }
})


hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("inc", function(value, options) {
    return value+1;
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret:'my secret',
    resave:false,
    saveUninitialized:false,
    cookie:{maxAge:1000000}
}))

app.use(validator());


app.use(express.static(__dirname+'/static'))

app.use(appMiddleware.logger);

app.use(appMiddleware.authenticated);

app.use('/', index);
app.use('/projects', projects);
app.use('/admin', appMiddleware.authenticate, admin)

// app.get('/contact', routes.contact);

// app.get('/blogs', routes.blogList);

// app.get('/projects', routes.projectList);
// app.get('/project/:projectAlias', routes.projectDetail);

// app.get('/login', routes.login);
// app.post('/login', routes.doLogin);

// app.get('/signup', routes.signup);
// app.post('/signup', routes.doSignup);


// app.get('/dashboard', routes.dashboard);
// app.get('/admin/projects', routes.adminProjectList);
// app.get('/admin/projects/:alias', routes.adminProjectDetail);

app.use(appMiddleware.notFoundError);
app.use(appMiddleware.handleError);


app.listen(3000, () => console.log('Server started on port 3000'));