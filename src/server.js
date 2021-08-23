//variable
const express = require('express');
const app = express();

//package
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cokieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

const { url } = require('./config/database');
const cookieParser = require('cookie-parser');

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection to database established`)
}).catch(err=>{
    console.log(`db error ${err.message}`);
}); 

// require('./config/passport')(passport);

//settings 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//middleware
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
    secret: 'microprivate',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash);
//routes
require('./app/routes')(app, passport);
//Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});