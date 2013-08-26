Lambda.Logic = {}
Lambda.Logic.True = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction(a, new Lambda.Abstraction (b, a), 'True');
};

Lambda.Logic.False = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction(a, new Lambda.Abstraction (b, b), 'False');
};

Lambda.Logic.Nand = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction (
      a,
      new Lambda.Abstraction (
        b,
        new Lambda.Application (
          new Lambda.Application (
            new Lambda.Application (
              new Lambda.Application (a, b),
              Lambda.Logic.False ()
            ),
            Lambda.Logic.False ()
          ),
          Lambda.Logic.True ()
        )
    ),
    'Nand'
  )
}

Lambda.Logic.Not = function () {
  var a = new Lambda.Variable ('a');
  
  return new Lambda.Abstraction(a,
		  new Lambda.Application(
			new Lambda.Application(
				Lambda.Logic.Nand(),
				a	
			),
			a
		  ),
		'Not'
	);
};

Lambda.Logic.And = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');
  
  return new Lambda.Abstraction (a,
			new Lambda.Abstraction (b,
				new Lambda.Application (
					Lambda.Logic.Not(),
					new Lambda.Application(
						new Lambda.Application(Lambda.Logic.Nand(),a),
						b	
					)
				)
		  ),
		'And'
	);
};


Lambda.Logic.Or = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');
  
  return new Lambda.Abstraction (a,
			new Lambda.Abstraction (b,
				new Lambda.Application (
					new Lambda.Application (
						Lambda.Logic.Nand (),
					    new Lambda.Application(Lambda.Logic.Not(), a)
					),
					new Lambda.Application(Lambda.Logic.Not(), b)
				)
			),
			'Or'
		);	   

}
