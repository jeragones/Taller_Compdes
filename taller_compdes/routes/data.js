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

;

function getPreguntas(callback){
	connection.query('SELECT id_pregunta, enunciado FROM pregunta', function(err, resp)
    {
        if (err) 
            callback(err,null);
        else
        	
            callback(null,resp);

    });
}

function insert(nombre,usuario,clave,pregunta,respuesta,callback){

	connection.query('INSERT INTO usuario VALUES ('+null+',"'+nombre+'",'+
                                                         '"'+usuario+'",'+
                                                         '"'+clave+'",'+
                                                         pregunta+','+
                                                         '"'+respuesta+'");', function(err, resp)
    {
        if (err){
        	console.log(err); 
            callback(err,null);}
        else
        	callback(null,resp);

    });
}


module.exports = {getPreguntas:getPreguntas,insert:insert};


/*function getColour(username, roomCount, callback)
{
    connection.query('SELECT hexcode FROM colours WHERE precedence = ?', [roomCount], function(err, result)
    {
        if (err) 
            callback(err,null);
        else
            callback(null,result[0].hexcode);

    });

}

//call Fn for db query with callback
getColour("yourname",4, function(err,data){
        if (err) {
            // error handling code goes here
            console.log("ERROR : ",err);            
        } else {            
            // code to execute on data retrieval
            console.log("result from db is : ",data);   
        }    

});*/
