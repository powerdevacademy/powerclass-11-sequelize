const jwt = require('jsonwebtoken');
const constants = require('../constants');

const verifyToken = (req, res, next) => {
    if(req.headers["authorization"]) {
        const [bearer, token] = req.headers["authorization"].split(" ");

        jwt.verify(token, constants.SERVER_KEY, (err, data) => {
            if (err) {
                console.log('err', err);

                res.status(403).json({
                    message: "Token Inválido",
                    errorCode: err.name,
                    errorMsg: err.message
                });
            } else {
                //vaidar se o usuário ainda está ativo (no banco de dados)
                //verificar scopes 
                //...
                req.token = { ...data };
                next();
            }
        });
    }
};

module.exports = verifyToken;