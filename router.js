const express = require('express');
const router = express.Router();

const userConstroller = require('./controllers/userController');
const postController = require('./controllers/postController');

// user related routes
router.get('/', userConstroller.home);
router.post('/register', userConstroller.register);
router.post('/login', userConstroller.login);
router.post('/logout', userConstroller.logout);

// profile related routes
router.get('/profile/:username', userConstroller.ifUserExists, userConstroller.profilePostsScreen);

// post related routes
router.get('/create-post', userConstroller.mustBeLoggedIn, postController.viewCreateScreen);
router.post('/create-post', userConstroller.mustBeLoggedIn, postController.create);
router.get('/post/:id', postController.viewSingle);
router.get('/post/:id/edit', userConstroller.mustBeLoggedIn, postController.viewEditScreen);
router.post('/post/:id/edit', userConstroller.mustBeLoggedIn, postController.edit);
router.post('/post/:id/delete', userConstroller.mustBeLoggedIn, postController.delete);
router.post('/search', postController.search);

module.exports = router;