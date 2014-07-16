var express = require('express');
var router = express.Router();

router.get("/", function(req, res){
	res.render('lostpassword',{title:"Recuperar Contraseña"});
});

router.post("/", function(req, res){
	
	
	res.send("cualquier estupides");
});


module.exports = router;