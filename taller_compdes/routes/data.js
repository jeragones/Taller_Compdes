
var data = require('mysql');

var connection = data.createConnection({
	user: 'adminSesiones',
	password: 'admin123', 
	host: 'localhost',
	port: 3306, 
	database: 'sesiones'
});

connection.connect(function(err) {
	if (err) {
		console.log("error conexion con la base de datos"); 
	} else {
		console.log("conexion exitosa con la base de datos");    
	}
});

function log(usuario,callback){

	connection.query('SELECT nombre FROM usuario WHERE usuario="'+usuario+'"', function(err, rep){
		if (err) 
			callback(err,null);
		else
			callback(null,resp);
	});

}
function login(usuario, clave, callback){
	connection.query('SELECT nombre FROM usuario WHERE usuario="'+usuario+'" AND clave="'+clave+'"', function(err, resp){
		if (err) 
			callback(err,null);
		else
			callback(null,resp);
	});
}

function getPreguntas(callback){
	connection.query('SELECT id_pregunta, enunciado FROM pregunta', function(err, resp) {
		if (err) 
			callback(err,null);
		else
			callback(null,resp);
	});
}

function getPregunta(usuario, callback){
	connection.query('SELECT usuario, enunciado FROM pregunta INNER JOIN usuario ON id_pregunta=pregunta WHERE usuario="'+usuario+'"', function(err, resp) {
		if (err) 
			callback(err,null);
		else
			callback(null,resp);
	});
}

function getRespuesta(usuario, respuesta, callback){
	connection.query('SELECT usuario FROM usuario WHERE usuario="'+usuario+'" AND respuesta="'+respuesta+'"', function(err, resp) {
		if (err) 
			callback(err,null);
		else
			callback(null,resp);
	});
}

function insert(nombre,usuario,clave,pregunta,respuesta,callback) {
	connection.query('INSERT INTO usuario VALUES ('+null+',"'+nombre+'",'+
				'"'+usuario+'",'+
				'"'+clave+'",'+
				pregunta+','+
				'"'+respuesta+'");', function(err, resp) {
		if (err){
			callback(err,null);}
		else{
			callback(null,resp);
		}
	});
}

function setClave(usuario, clave, callback) {
	connection.query('UPDATE usuario SET clave="'+clave+'" WHERE usuario="'+usuario+'"', 
					function(err, resp) {
		if (err){
			callback(err,null);}
		else{
			callback(null,resp);
		}
	});
}

module.exports = {login:login,log:log,getPreguntas:getPreguntas, getPregunta:getPregunta, getRespuesta:getRespuesta, insert:insert, setClave:setClave};