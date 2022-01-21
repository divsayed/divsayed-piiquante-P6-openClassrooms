//multer pour la gestion des images : stockage, nom et extension
const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};
//préciser à multer où enregistrer les fichiers images et les renommer
const storage = multer.diskStorage({
    destination: (req, file, callback) => { 
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        //// On génère un nouveau nom avec le nom d'origine
        const name = file.originalname.split(' ').join('_'); 
        //mime type
        const extension = MIME_TYPES[file.mimetype];
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image');