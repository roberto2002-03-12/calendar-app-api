const { response } = require('express');
const { validationResult } = require('express-validator');

/*
Los Middlewares funcionan de la siguiente manera
petición => middleware => acción
en este caso si el middleware encuentra un error entonces
no va ejecutar acción y va retornar un error definido
*/

const validarCampos = (req, res = response, next) => {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            //con mapped enviamos todos los errores de manera
            //hashmap
            errors: errors.mapped()
        });
    };

    //mandar hacer lo siguiente
    next();
};

module.exports = {
    validarCampos
}