const moment = require('moment');

const isDate = (value) => {
    if (!value) {
        return false;
    }

    const fecha = moment(value);
    //is valid es una función para validar que este
    //en formato tipo fecha
    if (fecha.isValid()) {
        return true;
    } else {
        return false;
    }
}

module.exports = { isDate };