var Lambda = {};

/*
 * Lambda Basic definition: 
 * 
 * The set of lambda expressions, Λ, can be defined inductively:
 * 
 * - If x is a variable, then x ∈ Λ
 * - If x is a variable and M ∈ Λ, then (λx.M) ∈ Λ
 * - If M, N ∈ Λ, then (M N) ∈ Λ
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

// Clone:

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
  if (!this.M.alphaConversion (varname, new_varname)) {
     return false;
  }
  
  if (!this.N.alphaConversion (varname, new_varname)) {
	// revert changes ...
	this.M.alphaConversion (new_varname, varname);
	return false;
  }

  return true;
};

Lambda.Abstraction.prototype.alphaConversion = function (varname, new_varname, bound) {
	if (this.x.varname === new_varname) {
	  return false;
	}
	
	if (bound) {
		if (this.x.varname !== varname) {
			return this.M.alphaConversion (varname, new_varname, bound);	
		}
		
		return true;
	}
	else {
		if (this.x.varname === varname) {
			if (this.M.alphaConversion (varname, new_varname, true)) {
				this.x.varname = new_varname;
				return true;
			}
		}
		else {
			return this.M.alphaConversion (varname, new_varname, bound);			
		}
	}
	
	return false;
};

Lambda.Variable.prototype.alphaConversion = function (varname, new_varname) {
	if (this.varname === varname) {
	  this.varname = new_varname;	
	}
	
	return true;
};

function verbose(show, msg) {
	if (show) {
		print(msg);
	}
}

// Beta Reduction
/*
 * "The pure untyped lambda calculus does not satisfy the strong normalization property, and not even the weak normalization property"
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
	  return this.M.M.apply (this.M.x.varname, this.N).betaReduction (); 
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

// --- beta step 
Lambda.Application.prototype.betaReductionStep = function () {
	if (this.M instanceof Lambda.Abstraction) {
	  return this.M.M.apply (this.M.x.varname, this.N);
	}
	else {
	  this.M = this.M.betaReduction ();
  	  this.N = this.N.betaReduction ();
	}
	
	return this;
}

Lambda.Abstraction.prototype.betaReductionStep = function () {
  this.M = this.M.betaReduction ();
  
  return this;
}

Lambda.Variable.prototype.betaReductionStep = function () {
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
Lambda.Application.prototype.toString = function () {
  return '(' + this.M.toString () + " " + this.N.toString() + ")";
};

Lambda.Abstraction.prototype.toString = function () {
  return "(" + (this.note?("{" + this.note + '}'):'') + '&lambda;' + this.x.toString () + '.' + this.M.toString () + ")"; 
};

Lambda.Variable.prototype.toString = function () {
  return (this.note?("{" + this.note + '}'):'') + this.varname || "";
};


/*
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
	/* switch (this.operator) {
		case "||": 
			return "(Or "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "&&": 
			return "(And "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "+": 
			return "(Add "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "-": 
			return "(Sub "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "/":
			return "(Div "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "*":
			return "(Mul "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "%":
			return "(Mod "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		case "==":
		case "===":
			return "(Eq "+this.left.toLambda ()+" " +this.right.toLambda ()+")";
				
		case ">":
			return "(Gt "+this.left.toLambda ()+" " +this.right.toLambda ()+")";

		default:
			return this.left.toLambda () + " " + this.operator + " " + this.right.toLambda ();
	};*/
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
		params += " " + this.arguments[i].toLambda(); 
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
	var args ="";
	for (p in this.params) {
		args += "$" + this.params[p].toLambda () + ".";
	};
	
	args = args || "$_.";

	var result = args + " " + this.body.toLambda ();

	return "{"+this.id.toString () + "}" + result;
};

AST.FunctionExpression.prototype.toLambda = function () {
	return this.type
};

AST.Identifier.prototype.toLambda = function () {
	return this.name;
};

AST.IfStatement.prototype.toLambda = function () {
	return "(" + this.test.toLambda()+" "+this.consequent.toLambda()+" "+(this.alternate?this.alternate.toLambda():"Undefined")+") )";
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
			result += ";\n" + this.body[b].Func ();
		}
	}

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
	switch (this.operator) {
		case "!":
			return "(Not " + this.argument.toLambda () + ")";
		default:
			return this.operator + this.argument;
	}
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


 


 
