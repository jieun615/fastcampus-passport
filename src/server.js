const cookieSession = require('cookie-session');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const path = require('path');
const User = require('./models/users.model');
const passport = require('passport');
const { checkAuthenticated, checkNotAuthenticated } = require('./middlewares/auth');
const cookieEncryptionKey = ['key1', 'key2'];

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

mongoose.connect(`mongodb+srv://RJ36l5:vsaHikMWieXgVdx1@cluster0.vwbpndz.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('mongodb connected')
    })
    .catch((err) => {
        console.log(err);
    })

app.use("/static", express.static(path.join(__dirname, 'public')));

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index');
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login');
})

app.post('/login', (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
        if(err) {
            return next(err);
        }
        if(!user) {
            return res.json({ msg: info})
        }
        req.logIn(user, function (err) {
            if(err) { return next(err); }
            res.redirect('/');
        })
    })(req, res, next)
})

app.get('/signup', checkNotAuthenticated, (req, res) => {
    res.render('signup');
})

app.post('/signup', async (req, res) => {
    //유저 객체 생성
    const user = new User(req.body)
    try{
        //유저 컬랙션에 유저를 저장
        await user.save();
        return res.status(200).json({
            success: true
        })
    } catch (error) {
        console.error(error);
    }
})

const port = 3000;
app.listen(port, () => {
    console.log(`listening on ${port}`);
});