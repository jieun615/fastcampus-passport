const cookieSession = require('cookie-session');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('./middlewares/auth');
const cookieEncryptionKey = ['key1', 'key2'];
const mainRouter = require('./routers/main.router');
const usersRouter = require('./routers/user.router');
const productsRouter = require('./routers/products.router');
const port = 3000;

require('dotenv').config();

app.use(cookieSession({
    name: 'cookie-session-name',
    keys: cookieEncryptionKey
}))

// register regenerate & save after the cookieSession middleware initialization
app.use(function(request, response, next) {
    if (request.session && !request.session.regenerate) {
        request.session.regenerate = (cb) => {
            cb()
        }
    }
    if (request.session && !request.session.save) {
        request.session.save = (cb) => {
            cb()
        }
    }
    next()
})

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport');

app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/static", express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/auth', usersRouter);
app.use('/products', productsRouter);

app.listen(port, () => {
    console.log(`listening on ${port}`);
});