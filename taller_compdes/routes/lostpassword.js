var express = require('express');
var router = express.Router();
var data = require('./data');

router.get("/", function(req, res){
	res.render('lostpassword',{title:"Recuperar Contraseña", usuario:true});
});

router.post("/", function(req, res){
	if(req.body.btnRecuperar !== "") { 
		var respuesta = req.body.txtRespuesta;
		var usuario = req.body.btnRecuperar;
		data.getRespuesta(usuario, respuesta, function(err, resp) {
	        if(err) {
	            console.log('ERROR EN LA CONSULTA');
	        } else {
	        	if(resp.length > 0) {
	        		res.render('changepassword', { title: 'Cambiar contraseña', data:resp});
	        	} else {
					res.render('lostpassword',{title:"Recuperar Contraseña", usuario:true});        		
	        	}
	        }
	    });
	} else {
		var usuario = req.body.txtUser;
		data.getPregunta(usuario, function(err, resp) {
	        if(err) {
	            console.log('ERROR EN LA CONSULTA');
	        } else {
	        	res.render('lostpassword', { title: 'Pregunta de seguridad', usuario:false, data:resp});
	        }
	    });
	}
});

module.exports = router;