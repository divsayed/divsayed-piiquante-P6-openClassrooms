const express = require('express');    // Importation d'express => Framework basé sur node.js
const mongoose = require('mongoose');  // Plugin Mongoose pour se connecter à la base de données Mongo Db
const path = require('path');          // Plugin de téléchargement des images et permet de travailler avec les répertoires et chemin de fichier      
const helmet = require('helmet')       // module 'helmet' pour la sécurité en protégeant l'application de certaines vulnérabilités

//importation des routes user et sauces
const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces')

const app = express();               // Création d'une application express

//connexion  à la base de données Mongo Db
mongoose.connect('mongodb+srv://sayed38:B4512H1kdRb1rFKB@cluster0.etcuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS  Middleware Header pour contourner les erreurs .
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
// Middleware qui permet acceder au corps de la requête envoyées grâce à req.body
app.use(express.json());
 
app.use('/api/auth', userRoutes);
app.use('/api/sauces', saucesRoutes);
app.use(helmet({
  crossOriginResourcePolicy: false,
}));


//Midleware qui permet de charger les fichiers qui sont dans le repertoire images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Export de l'application express pour déclaration dans server.js
module.exports = app;
