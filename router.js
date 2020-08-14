const express = require('express');
const router = express.Router();

const userConstroller = require('./controllers/userController');
const postController = require('./controllers/postController');
const followController = require('./controllers/followController');

// user related routes
router.get('/', userConstroller.home);
router.post('/register', userConstroller.register);
router.post('/login', userConstroller.login);
router.post('/logout', userConstroller.logout);
router.post('/doesUsernameExist', userConstroller.doesUsernameExist);
router.post('/doesEmailExist', userConstroller.doesEmailExist);

// profile related routes
router.get('/profile/:username', userConstroller.ifUserExists, userConstroller.sharedProfileData, userConstroller.profilePostsScreen);
router.get('/profile/:username/followers', userConstroller.ifUserExists, userConstroller.sharedProfileData, userConstroller.profileFollowersScreen);
router.get('/profile/:username/following', userConstroller.ifUserExists, userConstroller.sharedProfileData, userConstroller.profileFollowingScreen);

// post related routes
router.get('/create-post', userConstroller.mustBeLoggedIn, postController.viewCreateScreen);
router.post('/create-post', userConstroller.mustBeLoggedIn, postController.create);
router.get('/post/:id', postController.viewSingle);
router.get('/post/:id/edit', userConstroller.mustBeLoggedIn, postController.viewEditScreen);
router.post('/post/:id/edit', userConstroller.mustBeLoggedIn, postController.edit);
router.post('/post/:id/delete', userConstroller.mustBeLoggedIn, postController.delete);
router.post('/search', postController.search);

// follow related routes
router.post('/addFollow/:username', userConstroller.mustBeLoggedIn, followController.addFollow);
router.post('/removeFollow/:username', userConstroller.mustBeLoggedIn, followController.removeFollow);

module.exports = router;