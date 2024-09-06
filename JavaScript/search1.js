$(function() {
 
	$("#global_menu_search a").click(function(){
		$('#header_search').css('display', 'flex');
		$('#gsc-i-id1').focus();
		return false;
	});	
 
	$("#header_search_cancel").click(function(){
		$('#header_search').css('display', 'none');
		return false;
	});	
 
 
});	
 
