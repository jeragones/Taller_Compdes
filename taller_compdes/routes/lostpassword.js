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

router.get("/", function(req, res){
	res.render('lostpassword',{title:"Recuperar Contraseña"});
});


module.exports = router;