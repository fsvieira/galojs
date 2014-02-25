var Lambda = require("./lib/lambda.js");
var AST = require("./lib/ast.js");


function assertLambdaParse (lambda, expected) {
	var l = Lambda.parse(lambda);
	return {
		test: l.toString("$") === expected,
		input: "Lambda Parse ('" + lambda + "')",
		output: l.toString("$"),
		expected: expected
	};
};

function assertAlphaConversion (lambda, varname, new_varname, expected) {

	var l = Lambda.parse(lambda);
	l = l.alphaConversion (varname, new_varname);

	return {
		test: l.toString("$") === expected,
		input: "Alpha ( lambda = " + lambda + ", var = " + varname + ", new var = " + new_varname + ")",
		output: l.toString("$"),
		expected: expected
	};
	
};

function assertJS2Lambda (jsfunc, expected) {
	var l = AST.parse (jsfunc.toString()).toLambda ();

	return {
		test: l.toString("$") === expected,
		input: "JS2Lambda ( js = " + jsfunc.toString() + ")",
		output: l.toString("$"),
		expected: expected
	};
	
};

function assertBetaNormalReduction (lambda, iter, expected) {
	var l = Lambda.parse(lambda);
	for (var i=0; i<iter; i++) {
		l = l.betaReduction();
	}

	return {
		test: l.toString("$") === expected,
		input: "Beta Normal ( lambda = " + lambda + ", iter = " + iter + ")",
		output: l.toString("$"),
		expected: expected
	};
}

function assertSTDLIB (lambda, expected) {
	// DO STUFF WITH STD LIB:
};

function printResult (result) {
	console.log(
		"Test: '" + result.input +"'"
		+ ", (output ==>> expected): "+ result.output + " ==>> " + result.expected + " = " + (result.test?"PASSED":"FAIL")
	);
};


module.exports = {
	test1: function () {
		printResult (assertLambdaParse ("$x.$y.x", "($x.($y.x))"));
		printResult (assertLambdaParse ("$x.$y.y", "($x.($y.y))"));

		printResult (assertAlphaConversion ("$x.$y.x", null, "xx", "($xx.($y.xx))"));
		printResult (assertAlphaConversion ("$x.$y.y", null, "xx", "($xx.($y.y))"));

		printResult (assertAlphaConversion ("$y.x", null, "yy", "($yy.x)"));
		printResult (assertAlphaConversion ("$y.y", null, "yy", "($yy.yy)"));

		printResult (assertAlphaConversion ("$a.$b.a y", null, "y", "($y_0.($b.(y_0 y)))"));
		
		printResult (assertBetaNormalReduction ("($x.$y.x) ($x.$y.x)", 1,  "($y.($x.($y.x)))"));
		printResult (assertBetaNormalReduction ("($x.$y.x) ($x.$y.y)", 1,  "($y.($x.($y.y)))"));
		printResult (assertBetaNormalReduction ("($x.$y.y) ($x.$y.x)", 1, "($y.y)"));
		printResult (assertBetaNormalReduction ("($x.$y.y) ($x.$y.y)", 1, "($y.y)"));

		printResult (assertBetaNormalReduction ("($x.$y.x) (x y)", 1,  "($y1.(x y))"));
		printResult (assertBetaNormalReduction ("($x.$y.y) (x y)", 1, "($y.y)"));

		printResult (assertBetaNormalReduction ("($x.$y.x y) (x y)", 1,  "($y1.((x y) y1))"));

		printResult (assertBetaNormalReduction ("($a.$b.x y) (x y)", 1,  "($a.$b.x y)"));


		function fac (n) {
			if (n === 0) {
				return 1;
			}
			else {
				return n * fac(n-1);
			}
		};

		printResult (assertJS2Lambda (fac, "fixpoint $fac.$n. ((=== n ($f.$x.x)) ($f.$x.f (x)) (* n (fac (- n ($f.$x.f (x))))))"));

	},
	testCasesFactory: function () {
		console.log(" ==================== Test case factory ============= ");

		function fac (n) {
			if (n === 0) {
				return 1;
			}
			else {
				return n * fac(n-1);
			}
		};

		var l = Lambda.parse(AST.parse (fac.toString()).toLambda ());
		var s = Lambda.std_lib(l);
		
		console.log("== F1 ==");
		var f1 = Lambda.parse (s.toString("$") + " ($f.$x.f (f (f x)))");
		console.log(f1);

		step = f1.betaReduction ();
		console.log("\n\nBetaReduction =>\n" + step.toString("$"));

		for(var i=0; i< 57; i++) {
			step = step.betaReduction ();
			console.log("\n\nBetaReduction =>\n" + step.toString("$"));
			console.log("===> " + i);
		}
	}
};


