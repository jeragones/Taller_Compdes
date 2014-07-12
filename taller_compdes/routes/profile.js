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

/* GET home page. */
router.get('/', login, function(req, res) {
	var session = req.session;
	var query = 'SELECT nombre FROM usuario WHERE usuario="'+session+'"';
    connection.query(query, function(err, resp) {
        if(err) {
            console.log('ERROR EN LA INSERSION');
        } 
        if(resp.length > 0) {
            res.render('profile', {title:usuario, mensaje:'Bienvenido '+resp.nombre+'!!!'});
        }
    });
});

function login(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.render('index', { title: 'Taller Compdes', error:false });
	}
}

module.exports = router;