$(document).ready(function() {
	$.ajax({ url: '/api/helloworld', success: function(result) {
		alert(result);
	}});
});
