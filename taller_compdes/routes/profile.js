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

router.get('/',login, function(req, res) {
	var session = req.session.user;
	var query = 'SELECT nombre FROM usuario WHERE usuario="'+session+'"';
    connection.query(query, function(err, resp) {
        if(err) {
            console.log('ERROR EN LA INSERSION');
        } 
        if(resp.length > 0) {
            res.render('profile', {title:session, data:resp});
        }
    });
});

router.post('/', function(req, res) {    
    if(req.body.btnIniciar == 0) {
        var usuario = req.body.txtUsuario;
        var clave = req.body.txtClave;
        if(usuario != "" && clave != "") {
            var query = 'SELECT nombre FROM usuario WHERE usuario="'+usuario+'" AND clave="'+clave+'"';
            connection.query(query, function(err, resp) {
                if(err) {
                    console.log('ERROR EN LA CONSULTA');
                } 
                if(resp.length > 0) {
                    req.session.user = usuario;

                    res.render('profile', {title:usuario, data:resp});
                }
                else {
                    res.render('index', { title:'Taller Compdes', error:true});
                }
            });
        }
    } else {
        res.render('index', { title: 'Taller Compdes' });
    }
});

function login(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.render('index', { title: 'Taller Compdes', error:false });
	}
}

module.exports = router;