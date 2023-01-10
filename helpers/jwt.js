const jwt = require('jsonwebtoken');

const generarJWT = (uid, name) => {
    return new Promise((resolve, reject) => {
        const payload = { uid, name };
        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h' //cuanto tiempo dura
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el token');
            }
            //retorna token
            resolve(token);
        });
    });
};

module.exports = {
    generarJWT
}