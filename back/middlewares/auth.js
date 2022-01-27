//middleware d'authentification : vérifier que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes et protége les routes
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        req.auth = {userId}; // = {userId: userId}
        if(req.body.userId && req.body.userId !== userId) {
            throw 'User ID non valide !';
        }
        else {
            next();
        }
    } catch {
        res.status(401).json({
            error : new Error("Requête non authentifiée !")
        });
    }
};
