
function user(){
	var user = $("#txtUser").val();

	$.ajax({ 
        url: 'http://localhost:3000/lostpassword',
        type: 'POST'
        
        
    }).done(function(data){
    	alert(data);

    });
}
