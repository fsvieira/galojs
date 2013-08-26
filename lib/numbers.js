Lambda.Numbers = {}

/*
    plus ≡ λm.λn.λf.λx. m f (n f x)

The successor function succ(n)=n+1 is β-equivalent to (plus 1).

    succ ≡ λn.λf.λx. f (n f x)

The multiplication function mult(m,n)=m*n uses the identity f^{(m*n)}(x) = (f^n)^m(x).

    mult ≡ λm.λn.λf. m (n f)

The exponentiation function exp(m,n)=m^n is straightforward by the definition of Church numerals.

    exp ≡ λm.λn. n m
*/


Lambda.Numbers.number = function (n) {
	var x = new Lambda.Variable('x');
	var f = new Lambda.Variable('f');
	var s = x;
	
	for(var i = 0; i < n; i++) {
		s = new Lambda.Application(f, s);
	}
	
	return new Lambda.Abstraction(f, new Lambda.Abstraction(x, s));
}

Lambda.Numbers.toDecimal = function (n) {
	var x = n.M.M, counter = 0;

	while (x = x.N) {
		counter++;
	}

	return counter;
}

Lambda.Numbers.plus = function () {

	var m = new Lambda.Variable("m");
	var n = new Lambda.Variable("n");
	var f = new Lambda.Variable("f");
	var x = new Lambda.Variable("x");

	return new Lambda.Abstraction (m,
						new Lambda.Abstraction (n,
							new Lambda.Abstraction (f,
								new Lambda.Abstraction (x,
									new Lambda.Application (new Lambda.Application (m, f),
									new Lambda.Application (new Lambda.Application (n, f), x))
								)
							)
						), "plus"
				);
}
