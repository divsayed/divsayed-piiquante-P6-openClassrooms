## Projet 6 - Construisez une API sécurisée pour une application d'avis gastronomiques "PIIQUANTE", dans laquelle les utilisateurs peuvent ajouter leurs sauces préférées et liker ou disliker les sauces ajoutées par les autres.

-------


 ## Nous installons tous les modules nécéssaires au backend  :
 
 * Node.js => pour construire le backend 
 * Framework JS Express => pour appliquer le CRUD à notre application
 * Mongoose => pour gérer la base de donnée mongoDB
 * Multer => package qui permet de gérer les fichiers entrants dans les requêtes HTTP
 * Helmet => pour sécurise les requêtes HTTP, sécurise les en-têtes, contrôle la prélecture DNS  
   du navigateur, empêche le détournement de clics.
 * bcrypt => permet de faire un "hash" du mot de passe  
 * JSON Web Tokens =>  permet de crypter les tokens d'authentification envoyés au client pour  
   authentifier leur session
 * Email-validator et password-validator => qui valide l'unicité de l'email
 * Dotenv => permet de travailler avec des variables d'environnement et sécuriser les mots de passe  
   d'un backend nodejs.
 * Nodemon => outil Node.js qui redémarre automatiquement notre script . 
