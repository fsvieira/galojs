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

  function empty_pair (a) {
    return new Lambda.Application (new Lambda.Application (Lambda.Collection.Pair(), a), v("empty"));
  };
  
  function pair (a, b) {
    return new Lambda.Application (new Lambda.Application (Lambda.Collection.Pair(), a) , b);
  };

  function first (a) {
    return new Lambda.Application (Lambda.Collection.First(), a);
  };


  function second (a) {
    return new Lambda.Application (Lambda.Collection.Second(), a);
  };

  function v(a) {
    return new Lambda.Variable (a);
  };

	function updateCode() {
		var code = $("#code").val();
		
		try {
			$("#output").html("");
			eval(code);
		} catch (e) {
			print(e);
		}
	};

  $("#code").bind('input propertychange', function () {
	updateCode();
  });

  updateCode();
  
  /* var fruits1 = pair(v("morangos"), v("abacaxi"));
  print ("fuits1: " + fruits1.toString());

  fruits1 = fruits1.betaReduction()
  print ("fuits1: " + fruits1.toString());

  fruits1 = fruits1.betaReduction()
  print ("fuits1: " + fruits1.toString());

  var beta = first(fruits1);
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  var fruits = pair (v("morangos"), pair (v("abacaxi") , empty_pair (v ("bananas"))));
  print ("fuits: " + fruits.toString());

  fruits = fruits.betaReduction()
  print ("fuits: " + fruits.toString());

  beta = first(fruits);
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  beta = beta.betaReduction();
  print ("beta: " + beta.toString());

  function append(list, elem) {
    
  }

  function append (list, element) {
    var head = Lambda.Collection.List.Head(element);
    
    return new Lambda.Application (
      new Lambda.Application (
        Lambda.Collection.List.Append(),
        head
      ),
      list
    );
  };

  function isEmpty (list) {
    return new Lambda.Application (Lambda.Collection.List.IsEmpty(), list);
  };

  var fruitList = Lambda.Collection.List.Empty();
  print ("fruitList: " + fruitList.toString());

  var empty = isEmpty(fruitList);
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());
  
  fruitList = append(fruitList, v("bananas"));
  print ("fruitList: " + fruitList.toString());

  fruitList = fruitList.betaReduction();
  print ("fruitList: " + fruitList.toString());

  fruitList = fruitList.betaReduction();
  print ("fruitList: " + fruitList.toString());

  fruitList = append(fruitList, v("bananas"));
  print ("fruitList: " + fruitList.toString());

  empty = isEmpty(fruitList);
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());

  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());


  empty = empty.betaReduction();
  print ("is list empty: " + empty.toString());
*/

});


