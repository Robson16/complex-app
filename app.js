const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const flash = require('connect-flash');
const markdown = require('marked');
const sanitizeHTML = require('sanitize-html');

const router = require('./router');

const app = express();

let sessionOptions = session({
    secret: 'Ai que tédio desgraçado!!!!',
    store: new MongoStore({
        client: require('./db'),
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
    }
});

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(express.static('public'));
app.use(sessionOptions);
app.use(flash());

app.use(function(req, res, next) {
    // make our markdown function available from within ejs templates
    res.locals.filterUserHTML = function(content) {
        return sanitizeHTML(markdown(content), {
            allowedTags: ['p', 'br', 'ul', 'ol', 'li', 'strong', 'bold', 'i', 'em', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
            allowedAttributes: {},
        });
    }

    // make all error and success flash messages available from all tempaltes
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");

    // make current user id availableon the req abject
    if (req.session.user) { 
        req.visitorId = req.session.user._id;
    } else {
        req.visitorId = 0;
    }

    // make user session data available from within view templates
    res.locals.user = req.session.user;
    next();
});
app.use('/', router);

module.exports = app;