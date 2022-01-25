
const bcrypt = require('bcrypt');    //bcrypter pour hash le mot de passe des utilisateurs
const jwt = require('jsonwebtoken'); //token de connection à l'application
const User = require('../models/User');

//Création d'un compte utilisateur et crypte son mot de passe 
exports.signup = (req, res, next) =>{
    //hash du mot de passe
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
           // console.log(req.body.email)
           //console.log(req.body.password)
            user.save()
            .then(() => res.status(201).json({message: 'Utilisateur créé !'}))
            .catch(error => res.status(400).json({error}));
        })
        .catch(error => res.status(500).json({error}));
};

//vérification de l'adresse email et du mot de passe crypté
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(User => {
        if (!User) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, User.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: User._id,
              token: jwt.sign(
                { userId: User._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };