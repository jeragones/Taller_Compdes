var express = require('express');
var router = express.Router();
var data = require('./data');


router.get('/',login, function(req, res) {
	var session = req.session.user;
	
    data.log(session,function(err, resp) {
        if(err) {
            console.log('ERROR');
            
        } else {
            res.render('profile', { title : 'Perfil'});
        }
    });
    

});

router.post('/', function(req, res) {    
    if(req.body.btnIniciar == 0) {
        var usuario = req.body.txtUsuario;
        var clave = req.body.txtClave;
        
        data.login(usuario,clave,function(err,resp){
            if(err){
                console.log("ERROR")
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
});

function logout(){
    delete req.session.user;
    res.render('index', { title:'Taller Compdes', error:true});
}

function login(req, res, next){
	if(req.session.user){
		next();
	} else {
		res.render('index', { title: 'Taller Compdes', error:false });
	}
}

module.exports = router;