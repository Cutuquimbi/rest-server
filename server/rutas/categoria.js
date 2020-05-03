const express = require('express');

let { verificaToken, verificaAdmin } = require('../middlewares/autenticacion')
const _ = require('underscore');

let app = express();

let Categoria = require('../models/categoria');

//============================
//Mostrar todas las categorias
//============================
app.get('/categoria', verificaToken, (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Categoria.find({})
        //.skip(desde)
        //.limit(limite)
        .sort('descripcion')
        .populate('usuario', 'nombre email')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });

            }


            Categoria.countDocuments({}, (err, conteo) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }


                res.json({
                    ok: true,
                    categorias,
                    cuantos: conteo
                });
            });

        });

});




//============================
//Mostrar una categoria por ID
//============================
app.get('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ('El id no existe')
                }
            });
        }
        res.json({
            ok: true,
            categoriaDB
        })
    });
});

//=======================
//Mostrar nueva categoria
//=======================
app.post('/categoria', verificaToken, (req, res) => {
    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriaDB
        });

    });

});

//=======================
//Actualizar categoria
//=======================
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    let body = _.pick(req.body, 'descripcion')

    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, categoriaDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            });
        }


        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });


});

//=======================
//Borrar categoria
//=======================
app.delete('/categoria/:id', [verificaToken, verificaAdmin], (req, res) => {
    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: ('El id no existe')
                }
            });
        }
        res.json({
            ok: true,
            message: `La categoria ${categoriaDB.descripcion} del usuario ${categoriaDB.usuario} fue borrada`
        })
    })
});




module.exports = app;