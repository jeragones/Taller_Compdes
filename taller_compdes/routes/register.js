
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
    user: 'adminSesiones',
    password: 'admin123', 
    host: 'localhost',
    port: 3306, 
    database: 'sesiones'
});

router.get('/', function(req, res) {
    var query = 'SELECT id_pregunta, enunciado FROM pregunta';
    connection.query(query, function(err, resp) {
        if(err) {
            console.log('ERROR EN LA CONSULTA');
        } else {
            res.render('register', { title : 'Restrar usuario', data : resp });
        }
    });
});

router.post('/', function(req, res) {
    
    if(req.body.btnRegistrar == 0) {
        var nombre = req.body.txtNombre;
        var usuario = req.body.txtUsuario;
        var clave = req.body.txtClave;
        var confirmar = req.body.txtConfirmar;
        var pregunta = req.body.cmbPregunta;
        var respuesta = req.body.txtRespuesta;
        if(nombre != "" && usuario != "" && clave != "" && pregunta != "" && respuesta != "") {
            if(clave === confirmar) {
                var query = 'INSERT INTO usuario VALUES ('+null+',"'+nombre+'",'+
                                                         '"'+usuario+'",'+
                                                         '"'+clave+'",'+
                                                         pregunta+','+
                                                         '"'+respuesta+'");';
                connection.query(query, function(err, resp) {
                    if(err) {
                        console.log('ERROR EN LA INSERSION');
                    } else {
                        res.render('index', { title: 'Taller Compdes' });
                    }
                });
            }
        }
    } else {
        res.render('index', { title: 'Taller Compdes' });
    }
});

module.exports = router;