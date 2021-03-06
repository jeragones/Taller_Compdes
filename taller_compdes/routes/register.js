
var express = require('express');
var router = express.Router();
var data = require('./data');


router.get('/', function(req, res) {   
    res.render('register', { title : 'Registrar usuario'});
   
});

router.post('/', function(req, res) {
    
    if(req.body.btnRegistrar == 0) {
        var nombre = req.body.txtNombre;
        var usuario = req.body.txtUsuario;
        var clave = req.body.txtClave;
        var confirmar = req.body.txtConfirmar;
        var pregunta = req.body.cmbPregunta;
        var respuesta = req.body.txtRespuesta;
       
        if(clave === confirmar) {
            data.insert(nombre,usuario,clave,pregunta,respuesta, function(err, resp) {
                if(err) {
                    console.log('ERROR EN LA INSERSION');
                    if(err.errno==1062){
                        res.render('register', { title: 'Taller Compdes' , error:"Usuario Existente"});
                    }
                } else {
                    res.render('index', { title: 'Taller Compdes' });
                }
            });
        }
        else{
            res.render('register', { title: 'Taller Compdes' , error:"Las claves no coinciden"});
        }
    } else {
        res.render('index', { title: 'Taller Compdes' });
    }
});

module.exports = router;