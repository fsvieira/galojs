/*function string_to_html (str) {
	return str.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;");
}*/


function print (msg) {
	if (msg !== undefined) { 
	  msg = msg.toString(); 
	}
	else {
		msg = '#undef'
	}
	$("#output").append('<div class="blocks">'+msg+'</div>');
}


$(document).ready(function() {
	
  print("start");

  function updateCode() {
		var code = $("#code").val();
		
		try {
			$("#output").html("");
			eval(code);
		} catch (e) {
			print(e);
			throw e;
		}
  };

  $("#code").bind('input propertychange', function () {
	updateCode();
  });

  updateCode();
  
});


