const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        //recordemos que en el texto del token
        //siempre incluye de manera cifrada el uid y le name
        const { uid, name } = jwt.verify(
            //acá va comparar que el token provenga del código SECRET_JWT_SEED
            token,
            process.env.SECRET_JWT_SEED
        );

        //los middlewares pueden realizar acciones o retornar valores
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    validarJWT
}