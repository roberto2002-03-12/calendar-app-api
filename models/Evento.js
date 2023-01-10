const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true
    },
    notes: {
        type: String
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, //definir que es tipo id
        ref: 'Usuario', //referencia al modelo Usuario
        required: true
    }
});
/*
¿por qué una función declarada si puede usar "this" pero una función
expresiva no puede? pues en este caso al utilizar function() va esperar
que se parsee todo el archivo Evento.js y va estar entre los primeros
por que lo que va poder utilizar this mientras que "() => {}" solo va ser
declarado dentro del scope que se la ha colocado por lo que no se va poder
utilizar this, es similar con lo que sucede con let y var 
*/
EventoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model('Evento', EventoSchema);