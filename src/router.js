const express = require('express');
const router = require('express-promise-router')();

const authMiddleware = require('./middleware/authMiddleware');

const AuthController = require('./controllers/AuthController');
const CarController = require('./controllers/CarController');

// Oauth callback - this has to be configured in Developer Center > Team Settings > OAuth 
router.get('/auth/oauth-callback', AuthController.oauthCallback);

// Login view
router.get('/login', AuthController.renderLoginView);

// Main view
router.get('/', authMiddleware, CarController.renderCarView);

// Logout action
router.post('/logout', authMiddleware, AuthController.logOut);

// Lock doors action
router.post('/doors/lock', authMiddleware, CarController.lockDoors);

// Unlock doors action
router.post('/doors/unlock', authMiddleware, CarController.unlockDoors);


module.exports = router;
