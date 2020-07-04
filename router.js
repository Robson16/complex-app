const express = require('express');
const router = express.Router();

const userConstroller = require('./controllers/userController');
const postController = require('./controllers/postController');

// user related routes
router.get('/', userConstroller.home);
router.post('/register', userConstroller.register);
router.post('/login', userConstroller.login);
router.post('/logout', userConstroller.logout);

// post related routes
router.get('/create-post', userConstroller.mustBeLoggedIn, postController.viewCreateScreen);
router.post('/create-post', userConstroller.mustBeLoggedIn, postController.create);
router.get('/post/:id', postController.viewSingle);




module.exports = router;