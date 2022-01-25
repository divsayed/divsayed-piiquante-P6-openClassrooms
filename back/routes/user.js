const express = require('express');
//la fonction Router
const router = express.Router();
const userCtrl = require('../controllers/user');

// router du parcours utilisateur 
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
//exportation du module
module.exports = router; 

