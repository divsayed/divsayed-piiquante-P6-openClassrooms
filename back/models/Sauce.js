
const mongoose = require('mongoose');

//créer schéma de données dédié à la SAUCE
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true },
    name : {type: String, required: true },
    manufacturer : {type: String, required: true },
    description : {type: String, required: true },
    mainPepper : {type: String, required: true }, // le principal ingrédient épicé de la sauce
    imageUrl : {type: String, required: true }, // l'URL de l'image de la sauce téléchargée par l'utilisateur
    heat : {type: Number, required: true },
    likes :{type: Number},
    dislikes : {type: Number },
    usersLiked: { type: [String] },
    usersDisliked: { type: [String]}
});

module.exports = mongoose.model('Sauce', sauceSchema);