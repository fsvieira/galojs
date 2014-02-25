/* Use webmake to compile the file to the browser like this:
 * webmake js/lambda.webmake.js js/lambda.js 
 */

/*function string_to_html (str) {
	return str.replace(/\n/g, "<br>").replace(/\t/g, "&nbsp;");
}*/

var Lambda = require("../node/lib/lambda.js");
var AST = require("../node/lib/ast.js");


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


