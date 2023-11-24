const express = require('express');
const passport = require('passport');
const User = require('../models/users.model');
const usersRouter = express.Router();

usersRouter.post('/login', (req, res, next) => {
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

usersRouter.post('/logout', (req, res, next) => {
    req.logOut(function (err) {
        if(err) { return next(err); }
        res.redirect('/login');
    })
})

usersRouter.post('/signup', async (req, res) => {
    //유저 객체 생성
    const user = new User(req.body)
    try{
        //유저 컬랙션에 유저를 저장
        await user.save();
        res.redirect('/login');
    } catch (error) {
        console.error(error);
    }
})

usersRouter.get('/google', passport.authenticate('google'))

usersRouter.get('/google/callback', passport.authenticate('google', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
}))

module.exports = usersRouter;