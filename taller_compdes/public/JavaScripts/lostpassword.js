/*
function user(){
	var user = $("#txtUser").val();
/*
	$.post( "http://localhost:3000/lostpassword", 
			{user: user}, 
			function( data ) {
  				alert(data);		
  	});*/
/*
	$.ajax({ 
        url: 'http://localhost:3000/lostpassword',
        type: 'POST',
        data: {user : user}
    }).success(function(data) {
    	alert(JSON.stringify(data));
    }).error(function(data){
    	alert(JSON.stringify(data));
    });
}
*/

function recuperar() {
	$("#recuperar").val( $("#txtUser").val() );
	alert($("#recuperar").val());
}