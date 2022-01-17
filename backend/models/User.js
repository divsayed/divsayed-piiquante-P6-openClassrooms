//créer schéma User qu'on a besoin 
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');//package de validation pour prévalider les informations avant de les enregistrer 

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},//unique:Pour s'assurer que deux utilisateurs ne puissent pas utiliser la même adresse e-mail
    password: {type:String, required: true}
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);