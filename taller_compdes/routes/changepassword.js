var express = require('express');
var router = express.Router();
var data = require('./data');

router.get("/", function(req, res){
	res.render('lostpassword',{title:"Recuperar Contraseña", usuario:true});
});

router.post("/", function(req, res){
	var usuario = req.body.btnCambiar;
	var clave = req.body.txtClave;
	var confirmar = req.body.txtConfirmar;
	if(clave === confirmar) {
		data.setClave(usuario, clave, function(err, resp) {
	        if(err) {
	            console.log('ERROR EN LA ACTUALIZACION');
	        } else {
	        	res.render('index', { title: 'Taller Compdes', error:false });
	        }
	    });
	} else {
		res.render('changepassword', { title: 'Cambiar contraseña', data: [{usuario:usuario}]});
	}
});

module.exports = router;