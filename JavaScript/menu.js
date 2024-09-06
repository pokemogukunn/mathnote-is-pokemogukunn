$(function() {
 
	$("#link_menu").click(function(){
		$('#list_menu').animate({width:'toggle'}, 'fast');
		return false;
	});	
 
	$("#link_menu_close").click(function(){
		$('#list_menu').animate({width:'hide'}, 'fast');
		return false;
	});	
 
 
 
});	
 
