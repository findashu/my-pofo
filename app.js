const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const validator = require('express-validator');

const app = express();
const appMiddleware = require('./middlewares/appMiddleware');
const routes = require('./routes/index');

app.set('views',__dirname+'/views');
app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout' });

hbs.registerPartials(__dirname+'/views/partials');
hbs.registerHelper("inc", function(value, options) {
    return value+1;
})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(validator());


app.use(express.static(__dirname+'/static'))

app.use(appMiddleware.logger);

app.get('/', routes.index);

app.get('/contact', routes.contact);

app.get('/blogs', routes.blogList);

app.get('/projects', routes.projectList);
app.get('/project/:projectAlias', routes.projectDetail);

app.get('/login', routes.login);
app.post('/login', routes.doLogin);

app.get('/signup', routes.signup);
app.post('/signup', routes.doSignup);


app.get('/dashboard', routes.dashboard);
app.get('/admin/projects', routes.adminProjectList)

app.use(appMiddleware.notFoundError);
app.use(appMiddleware.handleError);


app.listen(3000, () => console.log('Server started on port 3000'));