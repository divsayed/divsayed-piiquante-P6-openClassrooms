const express = require('express');
const mongoose = require('mongoose');

// //importation de route user 
 const userRoutes = require('./routes/user');


 const app = express();//créer application d'express

//base de donnée
mongoose.connect('mongodb+srv://sayed38:B4512H1kdRb1rFKB@cluster0.etcuz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());  //accée au corp de la requête
//enregistrer les router dans notre application
app.use('/api/auth', userRoutes);// route racine pour tous ce qui est lié à l'authentification



module.exports = app;
