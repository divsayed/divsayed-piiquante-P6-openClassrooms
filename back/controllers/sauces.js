//stocke la logique métier dans le fichier sauces.js de controllers 

// Récupération du modèle 'Sauce'
const Sauce = require('../models/Sauce');
//module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); 

// Créer une nouvelle sauce
exports.createSauce = (req, res, next) => { 
    const sauceObject = JSON.parse(req.body.sauce);
    //  console.log(JSON.parse(req.body.sauce));
    //  console.log(sauceObject);
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl:`${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
        likes: 0,
        dislikes: 0,
        usersLiked: [],
        usersDisliked: [],
    });
     //console.log(sauce);
    sauce.save() 
        .then(() => res.status(201).json({ message: 'Sauce enregistrée !'}))
        .catch(error => res.status(401).json({ error }));
};

//Modifier une sauce
exports.modifySauce = (req, res, next) => {
  Sauce.findOne({_id: req.params.id }) 
  .then(sauce => {
      if(req.auth.userId == sauce.userId ){
        const sauceObject = req.file ?
        {
            ...JSON.parse(req.body.sauce), // si le fichier image existe on le récup et on le modifie si besoin
            imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        }:{ ...req.body};
        Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'Sauce modifiée !'}))
            .catch(error => res.status(400).json({ error }));
            //console.log(sauceObject);
      } else{
        res.status(500).json({ erreur: "Non autorisé !" })
      }
  })
};


//Supprimer une sauce
exports.deleteSauce = (req, res, next) => {

  Sauce.findOne({_id: req.params.id }) 
  .then(sauce => {
      if(req.auth.userId == sauce.userId ){
        Sauce.findOne({ _id: req.params.id }) //on va le chercher pour obtenir l'url de l'image et supprimer le fichier image de la base
            .then(sauce => {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => { // on appelle unlink pour supprimer le fichier
                    Sauce.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Sauce supprimée !'}))
                    .catch(error => res.status(400).json({error: error}));
                        });
                })
            .catch(error => res.status(500).json({error}));

      } else{
        res.status(500).json({ erreur: "Non autorisé !" })
      }
  })
};

//récupérer une seule sauce
exports.getOneSauce =  (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
        .then(sauce => res.status(200).json(sauce))
        .catch(error => res.status(404).json({ error }));
};

//récuperer toutes les sauces de la base MongoDB
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
        .then(sauces => res.status(200).json(sauces))
        .catch(error => res.status(400).json({ error })); 
};


// likes et dislikes pour une sauce
exports.likeSauce = (req, res) => {
  /* Si le client Like cette sauce */
  if (req.body.like === 1) {
    Sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { likes: 1 }, $push: { usersLiked: req.body.userId } }
      )
      .then(() => res.status(200).json({ message: "Like ajouté !" }))
      .catch((error) => res.status(400).json({ error }));

    /* Si le client dislike cette sauce */
  } else if (req.body.like === -1) {
    Sauce.findOneAndUpdate(
      { _id: req.params.id },
      { $inc: { dislikes: 1 }, $push: { usersDisliked: req.body.userId } }
    )
      .then(() => res.status(200).json({ message: "Dislike ajouté !" }))
      .catch((error) => res.status(400).json({ error }));

    /* Si le client annule son choix */
  } else {
    Sauce.findOne({ _id: req.params.id })
    .then((resultat) => {
      if (resultat.usersLiked.includes(req.body.userId)) {
        Sauce.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { likes: -1 }, $pull: { usersLiked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "like retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      } else if (resultat.usersDisliked.includes(req.body.userId)) {
        Sauce.findOneAndUpdate(
          { _id: req.params.id },
          { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId } }
        )
          .then(() => res.status(200).json({ message: "dislike retiré !" }))
          .catch((error) => res.status(400).json({ error }));
      }
    });
  }
};