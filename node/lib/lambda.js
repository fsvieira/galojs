var LambdaParser = require("../parser/lambda_parser.js");

/* =====================================================================
 *  Lambda Basic definitions: 
 * 
 *  The set of lambda expressions, Λ, can be defined inductively:
 * 
 *  - If x is a variable, then x ∈ Λ
 *  - If x is a variable and M ∈ Λ, then (λx.M) ∈ Λ
 *  - If M, N ∈ Λ, then (M N) ∈ Λ
 * ===================================================================== 
*/

function Variable (varname) {
	this.varname = varname;
};


function Abstraction (x, M) {
	this.x = x;
	this.M = M;
};

function Application (M, N) {
	this.M = M;
	this.N = N;
};

/*
 * To String:
 */

Variable.prototype.toString = function (lambda) {
	return this.varname.toString ();	
};

Application.prototype.toString = function (lambda) {
	lambda = lambda || "λ";
	return "(" + this.M.toString (lambda) + " " + this.N.toString (lambda) + ")";
};

Abstraction.prototype.toString = function (lambda) {
	lambda = lambda || "λ";
	return  "(" + lambda + this.x.toString(lambda) + "." + this.M.toString (lambda) + ")";
};

/* =====================================================================
 *  Clone,
 *   Make a deep copy of the lambda-calculus terms. 
 * ===================================================================== */

Variable.prototype.clone = function () {
  return new Variable (this.varname);
};

Abstraction.prototype.clone = function () {
  return new Abstraction (this.x.clone (), this.M.clone ());
};

Application.prototype.clone = function () {
  return new Application (this.M.clone (), this.N.clone());
};

/*
 * Variables.
 */
Variable.prototype.variables = function (vars) {
	vars = vars || {bound: {}, free: {}};

	if (!vars.bound[this.varname]) {
		vars.free[this.varname] = true;
	}
	
	return vars;
};

Abstraction.prototype.variables = function (vars) {
	vars = vars || {bound: {}, free: {}};
	
	vars.bound[this.x.varname] = (vars.bound[this.x.varname] || 0)+1;
		
	this.M.variables (vars);

	vars.bound[this.x.varname]--;
	
	return vars;
};

Application.prototype.variables = function (vars) {
	vars = vars || {bound: {}, free: {}};

	this.M.variables (vars);
	this.N.variables (vars);

	return vars;
};



/* 
 * Alpha Conversion
 *
 * Alpha-conversion, sometimes known as alpha-renaming, allows bound variable names to be changed.
 * For example, alpha-conversion of λx.x might yield λy.y.
 * Terms that differ only by alpha-conversion are called α-equivalent.
 * Frequently in uses of lambda calculus, α-equivalent terms are considered to be equivalent.
 * 
 * The precise rules for alpha-conversion are not completely trivial.
 * First, when alpha-converting an abstraction, the only variable occurrences that are renamed are those that are bound
 * to the same abstraction. For example, an alpha-conversion of λx.λx.x could result in λy.λx.x,
 * but it could not result in λy.λx.y. The latter has a different meaning from the original.
 * Second, alpha-conversion is not possible if it would result in a variable getting captured by a different abstraction.
 * For example, if we replace x with y in λx.λy.x, we get λy.λy.y, which is not at all the same.
 * 
*/
/*
Application.prototype.alphaConversion = function (varname, new_varname, bound) {

  this.M.alphaConversion (varname, new_varname, bound);
  this.N.alphaConversion (varname, new_varname, bound);
  
  return this;
};

Abstraction.prototype.alphaConversion = function (varname, new_varname, bound) {
	
	if (bound && this.x.varname === varname) {
		return this;
	}
	
	if (this.x.varname === new_varname && (varname in this.variables().free) ) {
		var vars = this.variables();
		var i=1;
		var rename = this.x.varname + i;
		
		while (rename in vars.bound || rename in vars.free ) {
			i++;
			rename = this.x.varname + i;
		}
		 
		this.alphaConversion (this.x.varname, rename);
	}
	
	if (this.x.varname === varname) {
		this.x.alphaConversion (varname, new_varname);
		this.M.alphaConversion (varname, new_varname, true);
	}
	else {
		this.M.alphaConversion (varname, new_varname, bound);		
	}

	return this;
};

Variable.prototype.alphaConversion = function (varname, new_varname) {
	if (this.varname === varname) {
		this.varname = new_varname; 
	}
	
	return this;
};
*/

Application.prototype.alphaConversion = function (varname, new_varname) {
	var vars = this.variables();

	if (vars.free[new_varname]) {
		var name = new_varname;
		for (var i=0; vars.free[name]; i++) {
			name = name + "_" + i;
		}
		return this.alphaConversion (varname, name);
	}

	this.M.alphaConversion (varname, new_varname);
	this.N.alphaConversion (varname, new_varname);
  
	return this;
};

Abstraction.prototype.alphaConversion = function (varname, new_varname) {
		
	var vars = this.variables();
	var vn = varname || this.x.varname;

	if (vars.free[new_varname]) {
		var name = new_varname;
		for (var i=0; vars.free[name]; i++) {
			name = name + "_" + i;
		}
		// return this.alphaConversion (varname, name);
		new_varname = name;
	}
	
	if (!varname) {
		this.x.alphaConversion (this.x.varname, new_varname);
		this.M.alphaConversion (vn, new_varname);
		return this;
	}

	
	if (vars.free[varname]) {
		var name = this.x.varname;
		for (var i=0; vars.free[name] || name === new_varname; i++) {
			name = name + "_" + i;
		}
		
		if (name !== this.x.varname) {
			this.M.alphaConversion (this.x.varname, name);
			this.x.alphaConversion (varname, name);
		}
		
		this.M.alphaConversion (varname, new_varname);		
	}
	
	return this;
};

Variable.prototype.alphaConversion = function (varname, new_varname) {
	if (this.varname === varname) {
		this.varname = new_varname; 
	}
	
	return this;
};

// Beta Reduction
/*
 * "The pure untyped lambda calculus does not satisfy the strong normalization property, 
 *   and not even the weak normalization property"
 */

Application.prototype.apply = function (varname, value, free) {
  free = free || value.variables().free;

  this.M = this.M.apply(varname, value, free);
  this.N = this.N.apply(varname, value, free);
  return this;
}

Abstraction.prototype.apply = function (varname, value, free) {
  free = free || value.variables().free;

  if (this.x.varname.indexOf(free) !== -1) {
	 this.rename(free);
  }

  if (varname !== this.x.varname) {
	this.M = this.M.apply(varname, value)
  }

  return this;
}

Variable.prototype.apply = function (varname, value, free) {
  if (this.varname === varname) {
	  return value.clone ();
  }

  return this;
} 
 
Application.prototype.betaReduction = function () {
	if (this.M instanceof Abstraction) {
	  // Before Apply make sure there is no capture of free variables.
	  var vars = this.N.variables (); 
	  
	  
	  for (var v in vars.free) {
		console.log("Alpha Conversion =>\n\n" + this.M);
		console.log(this.M.x + " => " + v);
		 this.M.alphaConversion (this.M.x.varname, v);
	  }
	  
	  return this.M.M.apply (this.M.x.varname, this.N); // .betaReduction (); 
	}
	
	var M = this.M;
	this.M = this.M.betaReduction ();
	if (M != this.M) {return this.betaReduction ();}
	  
  	this.N = this.N.betaReduction ();
	
	return this;
}

Abstraction.prototype.betaReduction = function () {
  this.M = this.M.betaReduction ();
  
  return this;
}

Variable.prototype.betaReduction = function () {
  return this;
};

/*
 * Normal order
 *  - The leftmost, outermost redex is always reduced first. 
 *    That is, whenever possible the arguments are substituted 
 *    into the body of an abstraction before the arguments are reduced.
 */
Application.prototype.betaNormalOrderReduction = function () {
	/*if (this.M instanceof Lambda.Abstraction) {
	  // Before Apply make sure there is no capture of free variables.
	  var vars = this.N.variables (); 
	  
	  var r = this.M.x.varname;
	  
	  for (var v in vars.free) {
		 this.M.alphaConversion (r, v);
		 r = v;
	  }
	  
	  this.M.alphaConversion (r,this.M.x.varname);
	  
	  return this.M.M.apply (this.M.x.varname, this.N);
	}*/
	if (this.M instanceof Abstraction) {
		return this.M.M.apply(this.M.x.varname, this.N);
	}

	var M = this.M;
	this.M = this.M.betaNormalOrderReduction ();
	if (M != this.M) {return this.betaNormalOrderReduction ();}
	  
  	this.N = this.N.betaNormalOrderReduction ();
	
	return this;
}

Abstraction.prototype.betaNormalOrderReduction = function () {
  this.M = this.M.betaNormalOrderReduction ();
  
  return this;
}

Variable.prototype.betaNormalOrderReduction = function () {
  return this;
};


	
// TODO: for now dont use notes.
function parse (code) {
	var l = LambdaParser.parse(code);
	  
	function mkLambda (l) {
		switch (l.type) {
			case "application": return new Application (mkLambda(l.M), mkLambda(l.N));
			case "abstraction": return new Abstraction (mkLambda(l.x), mkLambda(l.M));
			case "variable": return new Variable (l.varname);
		}
	}
  
	return mkLambda(l);
};


 /*
  * Lambda STD Lib
  */
 
/*
 * TODO: rewrite this with polimorphism
 */ 
function bind (name, definition, lambda, do_parse) {
	if (do_parse) {
		definition = parse ("{"+ name +"}" + definition);
	}
	return new Application (
		new Abstraction (
			new Variable (name , name),
			lambda
		),
		// Lambda.parse ("{"+ name +"}" + definition)
		definition
	);
}

Variable.prototype.bind = function (name, definition, parse) {
	return bind (name, definition, this, parse);
};

Abstraction.prototype.bind = function (name, definition, parse) {
	return bind (name, definition, this, parse);

};

Application.prototype.bind = function (name, definition, parse) {
	return bind (name, definition, this, parse);
};


function std_lib (lambda) {
		
	return lambda
		.bind ("===", "$m.$n.&& (<= m n) (<= n m)",true)
		.bind ("<=", "$m.$n.isZero (- m n)",true)
		.bind ("-", "$m.$n. (n pred) m",true)
		.bind ("+", "$m.$n.n succ m",true)
		.bind ("*", "$m.$n.$f.m (n f)",true)
		.bind ("pred", "$n.$f.$x. n ($g.$h. h (g f)) ($u.x) ($u.u)",true)
		.bind ("isZero", "$n.n ($x.false) true",true)
		.bind ("||", "$p.$q.nand (! p) (! q)",true)
		.bind ("&&", "$p.$q.! (nand p q)",true)
		.bind ("!", "$p.nand p p",true)
		.bind ("nand", "$p.$q.p q false false true",true)
		.bind ("true", "$x.$y.x",true)
		.bind ("false", "$x.$y.y",true)
		.bind ("fixpoint", "$f.($x.f (x x)) ($x.f (x x))",true)
	;

};

function std_rename (lambda) {
	return lambda
			.alphaConversion ("===", "EQ")
			.alphaConversion ("<=", "LEQ") 
			.alphaConversion ("-", "SUB")
			.alphaConversion ("+", "ADD")
			.alphaConversion ("*", "MUL")
			.alphaConversion ("pred", "PRED")
			.alphaConversion ("isZero", "ISZERO")
			.alphaConversion ("||", "OR")
			.alphaConversion ("&&", "AND")
			.alphaConversion ("!", "NOT")
			.alphaConversion ("nand", "NAND")
			.alphaConversion ("true", "TRUE")
			.alphaConversion ("false", "FALSE")
			.alphaConversion ("fixpoint", "FIXPOINT")
	;
};


/*
 * 
 * TO JSON
 */
 
Application.prototype.toJSON = function () {
	return {type: "application", M: this.M.toJSON(), N: this.N.toJSON};
};

Abstraction.prototype.toJSON = function () {
	return {type: "asbtraction", x: this.x.toJSON(), M: this.M.toJSON()};	
};

Variable.prototype.toJSON = function () {
	return {type: "variable", varname: this.varname};
};



// Export functions:
module.exports = {
	Variable: Variable,
	Abstraction: Abstraction,
	Application: Variable,
	parse: parse,
	bind: bind,
	std_lib: std_lib,
	std_rename: std_rename
};

