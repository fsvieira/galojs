var Lambda = {};

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

Lambda.Variable = function (varname, note) {
  this.varname = varname;
  this.note = note;
};

Lambda.Abstraction = function (x, M, note) {
  this.x = x;
  this.M = M;
  this.note = note;
};

Lambda.Application = function (M, N) {
  this.M = M;
  this.N = N;
};

/* =====================================================================
 *  Clone,
 *   Make a deep copy of the lambda-calculus terms. 
 * ===================================================================== */

Lambda.Variable.prototype.clone = function () {
  return new Lambda.Variable (this.varname, this.note);
};

Lambda.Abstraction.prototype.clone = function () {
  return new Lambda.Abstraction (this.x.clone (), this.M.clone (), this.note);
};

Lambda.Application.prototype.clone = function () {
  return new Lambda.Application (this.M.clone (), this.N.clone());
};


/*
 * Variables.
 */
Lambda.Variable.prototype.variables = function (vars) {
	vars = vars || {bound: {}, free: {}};

	if (!vars.bound[this.varname]) {
		vars.free[this.varname] = true;
	}
	
	return vars;
};

Lambda.Abstraction.prototype.variables = function (vars) {
	vars = vars || {bound: {}, free: {}};
	
	vars.bound[this.x.varname] = (vars.bound[this.x.varname] || 0)+1;
		
	this.M.variables (vars);

	vars.bound[this.x.varname]--;
	
	return vars;
};

Lambda.Application.prototype.variables = function (vars) {
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
Lambda.Application.prototype.alphaConversion = function (varname, new_varname, bound) {

  this.M.alphaConversion (varname, new_varname, bound);
  this.N.alphaConversion (varname, new_varname, bound);
  
  return this;
};

Lambda.Abstraction.prototype.alphaConversion = function (varname, new_varname, bound) {
	
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

Lambda.Variable.prototype.alphaConversion = function (varname, new_varname) {
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

Lambda.Application.prototype.apply = function (varname, value) {
  this.M = this.M.apply(varname, value);
  this.N = this.N.apply(varname, value);
  return this;
}

Lambda.Abstraction.prototype.apply = function (varname, value) {
  if (varname !== this.x.varname) {
	this.M = this.M.apply(varname, value)
  }

  return this;
}

Lambda.Variable.prototype.apply = function (varname, value) {
  if (this.varname === varname) {
	  return value.clone ();
  }

  return this;
} 
 
Lambda.Application.prototype.betaReduction = function () {
	if (this.M instanceof Lambda.Abstraction) {
	  // Before Apply make sure there is no capture of free variables.
	  var vars = this.N.variables (); 
	  
	  for (var v in vars.free) {
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

Lambda.Abstraction.prototype.betaReduction = function () {
  this.M = this.M.betaReduction ();
  
  return this;
}

Lambda.Variable.prototype.betaReduction = function () {
  return this;
};


/*
 * Normal order
 *  - The leftmost, outermost redex is always reduced first. 
 *    That is, whenever possible the arguments are substituted 
 *    into the body of an abstraction before the arguments are reduced.
 */
Lambda.Application.prototype.betaNormalOrderReduction = function () {
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
	if (this.M instanceof Lambda.Abstraction) {
		return this.M.M.apply(this.M.x.varname, this.N);
	}

	var M = this.M;
	this.M = this.M.betaNormalOrderReduction ();
	if (M != this.M) {return this.betaNormalOrderReduction ();}
	  
  	this.N = this.N.betaNormalOrderReduction ();
	
	return this;
}

Lambda.Abstraction.prototype.betaNormalOrderReduction = function () {
  this.M = this.M.betaNormalOrderReduction ();
  
  return this;
}

Lambda.Variable.prototype.betaNormalOrderReduction = function () {
  return this;
};


// 
Lambda.parse = function (code) {
  var l = lambda.parse(code);
  
  function mkLambda (l) {
	  switch (l.type) {
		  case "application": return new Lambda.Application (mkLambda(l.M), mkLambda(l.N));
  		  case "abstraction": return new Lambda.Abstraction (mkLambda(l.x), mkLambda(l.M), l.note);
		  case "variable": return new Lambda.Variable (l.varname, l.note);
	  }
  }
  
  return mkLambda(l);
};


/*
 * To String
 */

Lambda.Application.prototype.toString = function (lambda) {
	lambda = lambda || "&lambda;";
		
	return "(" + this.M.toString (lambda) + " " + this.N.toString (lambda) + ")";
};

Lambda.Abstraction.prototype.toString = function (lambda) {
	var a = this;
	var result;
	lambda = lambda || "&lambda;";
	
	return  "(" + lambda + this.x.toString(lambda) + "." + this.M.toString (lambda) + ")";

};

Lambda.Variable.prototype.toString = function (lambda) {
  return this.varname.toString ();
}


/* =====================================
 * AST convertion to Lambda Strings:
 */
AST.ArrayExpression.prototype.toLambda = function () {
	return this.type;
};

AST.AssignmentExpression.prototype.toLambda = function () {
	return this.type;
};

AST.BinaryExpression.prototype.toLambda = function () {
	return "(" + this.operator + " " + this.left.toLambda () + " " + this.right.toLambda () + ")"; 
};

AST.BlockStatement.prototype.toLambda = function () {
	var result;

	for (var b in this.body) {
		if (!result) {
			result = this.body[b].toLambda ();
		}
		else {
			result += ";\n" + this.body[b].toLambda ();
		}
	}
		
	return result;
};

AST.BreakStatement.prototype.toLambda = function () {
	return this.type
};

AST.CallExpression.prototype.toLambda = function () {
	var params = "";
	for (var i in this.arguments) {
		params += " " + this.arguments[i].toLambda(""); 
	}
	return "(" + this.callee + params + ")";
};

AST.CatchClause.prototype.toLambda = function () {
	return this.type
};

AST.ConditionalExpression.prototype.toLambda = function () {
	return this.type
};

AST.ContinueStatement.prototype.toLambda = function () {
	return this.type
};

AST.DebuggerStatement.prototype.toLambda = function () {
	return this.type
};

AST.DoWhileStatement.prototype.toLambda = function () {
	return this.type
};

AST.EmptyStatement.prototype.toLambda = function () {
	return this.type
};

AST.ExpressionStatement.prototype.toLambda = function () {
	return this.expression.toLambda ();
};

AST.ForStatement.prototype.toLambda = function () {
	return this.type
};

AST.ForInStatement.prototype.toLambda = function () {
	return this.type
};

AST.FunctionDeclaration.prototype.toLambda = function () {	
	var args ="fixpoint {function "+this.id.toString ()+"} $" + this.id.toString () + ".";
	for (p in this.params) {
		args += "$" + this.params[p].toLambda () + ".";
	};
	
	// args = args || "$_.";

	var result = args + " " + this.body.toLambda ();

	return result;
};

AST.FunctionExpression.prototype.toLambda = function () {
	return this.type
};

AST.Identifier.prototype.toLambda = function () {
	return "{"+this.name+"}" + this.name;
};

AST.IfStatement.prototype.toLambda = function () {
	return "(" + this.test.toLambda()+" "
	       + this.consequent.toLambda()+" "
	       +(this.alternate?this.alternate.toLambda():"Undefined")
	       +")";
};

AST.LabeledStatement.prototype.toLambda = function () {
	return this.type
};

AST.Literal.prototype.toLambda = function () {
	// TODO: support other types like strings, ...
	// IF NAT:
	var result = "x";
	for (var i=1; i<= this.value; i++) {
		result = "f ("+result+")";
	}
		
	result = "({"+this.value+"} $f.$x." + result+")";
	return result;
};

AST.MemberExpression.prototype.toLambda = function () {
	return this.type
};

AST.NewExpression.prototype.toLambda = function () {
	return this.type
};

AST.ObjectExpression.prototype.toLambda = function () {
	return this.type
};

AST.PostfixExpression.prototype.toLambda = function () {
	return this.type
};

AST.Program.prototype.toLambda = function () {
	var result;
	for (var b in this.body) {
		if (!result) {
			result = this.body[b].toLambda ();
		}
		else {
			result += ";\n" + this.body[b].toLambda ();
		}
	}

	/*result = 
		"($true.$false.\
		 ($isZero.$fixpoint.\n" + result + "\n)\n\
		   ($f.($x.f (x x)) ($x.f (x x)))\n\
		   ($n.n ($x.false) true)\n\
		 ) ($x.$y.x) ($x.$y.y)\
		";*/

	return result;
};

AST.Property.prototype.toLambda = function () {
	return this.type
};

AST.ReturnStatement.prototype.toLambda = function () {
	return this.argument.toLambda ();
};

AST.SequenceExpression.prototype.toLambda = function () {
	return this.type
};

AST.SwitchCase.prototype.toLambda = function () {
	return this.type
};

AST.SwitchStatement.prototype.toLambda = function () {
	return this.type
};

AST.ThisExpression.prototype.toLambda = function () {
	return this.type
};

AST.ThrowStatement.prototype.toLambda = function () {
	return this.type
};

AST.TryStatement.prototype.toLambda = function () {
	return this.type
};

AST.UnaryExpression.prototype.toLambda = function () {
	return "(" + this.operator + " " + this.argument.toLambda () + ")";
};

AST.VariableDeclaration.prototype.toLambda = function () {
	var result = "var ";
	for (var v in this.declarations) {
		result += this.declarations[v].toLambda();
	}
	return result;
};

AST.VariableDeclarator.prototype.toLambda = function () {
	return this.id.toLambda () + " = " + this.init.toLambda ();
};

AST.WhileStatement.prototype.toLambda = function () {
	return this.type
};

AST.WithStatement.prototype.toLambda = function () {
	return this.type
};


 
 /*
  * Lambda STD Lib
  */
 
/*
 * TODO: rewrite this with polimorphism
 */ 
Lambda.bind = function (name, definition, lambda, parse) {
	if (parse) {
		definition = Lambda.parse ("{"+ name +"}" + definition);
	}
	return new Lambda.Application (
		new Lambda.Abstraction (
			new Lambda.Variable (name , name),
			lambda
		),
		// Lambda.parse ("{"+ name +"}" + definition)
		definition
	);
}

Lambda.Variable.prototype.bind = function (name, definition, parse) {
	return Lambda.bind (name, definition, this, parse);
};

Lambda.Abstraction.prototype.bind = function (name, definition, parse) {
	return Lambda.bind (name, definition, this, parse);

};

Lambda.Application.prototype.bind = function (name, definition, parse) {
	return Lambda.bind (name, definition, this, parse);
};


Lambda.std_lib = function (lambda) {
		
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

Lambda.std_rename = function (lambda) {
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
 
 Lambda.Application.prototype.toJSON = function () {
	return {type: "application", M: this.M.toJSON(), N: this.N.toJSON};
};

Lambda.Abstraction.prototype.toJSON = function () {
	return {type: "asbtraction", x: this.x.toJSON(), M: this.M.toJSON()};	
};

Lambda.Variable.prototype.toJSON = function () {
	return {type: "variable", varname: this.varname};
};


