const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    try {
        const eventos = await Evento.find().populate('user', 'name');

        res.json({
            ok: true,
            eventos
        });
    } 
    catch(err) {
        res.status(404).json({
            ok: false,
            msg: 'not found any'
        });
    };
};

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un error en el programa'
        });
    }
}

const actualizarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe con ese id'
            });
        }
        //validar que este autenticado o que el id sea del usuario
        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        //con el { new: true } declaramos que va retornar el objeto una vez actualizado
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, {new: true});

        res.json({
            ok: true,
            evento: eventoActualizado
        });
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    const uid = req.uid;

    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        };

        if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'no tiene autoridad para hacerlo'
            })
        };

        await Evento.findByIdAndDelete(eventoId);

        res.json({ok: true});
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}