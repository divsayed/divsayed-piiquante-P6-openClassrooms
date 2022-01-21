const mongoose = require('mongoose');
//package de validation pour prévalider les informations avant de les enregistrer 
const uniqueValidator = require('mongoose-unique-validator'); //unique:Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail
//créer schéma de données dédié à l'utilisateur
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type:String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);