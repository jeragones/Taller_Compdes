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

router.post('/', function(req, res) {    
    if(req.body.btnIniciar == 0) {
        var usuario = req.body.txtUsuario;
        var clave = req.body.txtClave;
        if(usuario != "" && clave != "") {
            var query = 'SELECT nombre FROM usuario WHERE usuario="'+usuario+'" AND clave="'+clave+'"';
            connection.query(query, function(err, resp) {
                if(err) {
                    console.log('ERROR EN LA INSERSION');
                } 
                if(resp.length > 0) {
                    req.session.user = usuario;
                    res.render('profile', {title:usuario, mensaje:'Bienvenido '+resp.nombre+'!!!'});
                }
                else {
                    res.render('index', { title:'Taller Compdes', error:true });
                }
            });
        }
    } else {
        res.render('index', { title: 'Taller Compdes' });
    }
});

module.exports = router;