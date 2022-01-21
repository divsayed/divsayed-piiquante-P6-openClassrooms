
//Création du router permettant les actions liées à "sauce"
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');  // Récupère la configuration d'authentification JsonWebToken
const multer = require('../middlewares/multer-config'); //middleware multer pour la gestion des images
const sauceCtrl = require('../controllers/sauces');

// Création des différentes ROUTES de l'API 
router.get('/', auth, sauceCtrl.getAllSauces);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
// Route qui permet de gérer les likes des sauces
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;


