var esprima = require("./esprima.js")

function AST (ast) {
	if (!ast) return ast;

	if (ast instanceof Array) {
		var r = [];
		for (var i in ast) {
			r[i] = AST(ast[i])
		}
		
		return r;
	}

	// console.log ("TODO: RANGE="+ JSON.stringify (ast.range));
	switch (ast.type) {
		case "ArrayExpression":
			return new AST.ArrayExpression ({
				type: ast.type,
                elements: AST(ast.elements),
                start: ast.range[0],
                end: ast.range[1]
			});
		case "AssignmentExpression":
			return new AST.AssignmentExpression ({
				type: ast.type,
                operator: ast.operator,
                left: AST(ast.left),
                right: AST(ast.right),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "BinaryExpression":
			return new AST.BinaryExpression ({
				type: ast.type,
                operator: ast.operator,
                left: AST(ast.left),
                right: AST(ast.right),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "BlockStatement":
			return new AST.BlockStatement ({
				type: ast.type,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "BreakStatement":
			return new AST.BreakStatement ({
				type: ast.type,
				label: ast.label,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "CallExpression":
			return new AST.CallExpression ({
				type: ast.type,
				callee: AST(ast.callee),
                'arguments': AST(ast.arguments),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "CatchClause":
			return new AST.CatchClause ({
				type: ast.type,
				param: AST(ast.param),
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ConditionalExpression":
			return new AST.ConditionalExpression ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent),
                alternate: AST(ast.alternate),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ContinueStatement":
			return new AST.ContinueStatement ({
				type: ast.type,
				label: ast.label,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "DebuggerStatement":
			return new AST.DebuggerStatement ({
				type: ast.type,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "DoWhileStatement":
			return new AST.DoWhileStatement ({
				type: ast.type,
				body: AST (ast.body),
				test: AST(ast.test),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "EmptyStatement":
			return new AST.EmptyStatement ({
				type: ast.type,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ExpressionStatement":
			return new AST.ExpressionStatement ({
				type: ast.type,
				expression: AST(ast.expression),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ForStatement":
			return new AST.ForStatement ({
				type: ast.type,
				init: AST(ast.init),
                test: AST(ast.test),
                update: AST(ast.update),
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ForInStatement":
			return new AST.ForInStatement ({
				type: ast.type,
				left: AST(ast.left),
                right: AST(ast.right),
                each: ast.each,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "FunctionDeclaration":
			return new AST.FunctionDeclaration ({
				type: ast.type,
				id: AST(ast.id),
                params: AST(ast.params),
                defaults: AST(ast.defaults),
				body: AST (ast.body),
                rest: ast.rest,
                generator: ast.generator,
                expression: ast.expression,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "FunctionExpression":
			return new AST.FunctionExpression ({
				type: ast.type,
				id: ast.id,
                params: AST(ast.params),
                defaults: AST(ast.defaults),
                rest: ast.rest,
                generator: ast.generator,
                expression: ast.expression,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "Identifier":
			return new AST.Identifier ({
				type: ast.type,
				name: ast.name,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "IfStatement":
			return new AST.IfStatement ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent),
                alternate: AST(ast.alternate),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "LabeledStatement":
			return new AST.LabeledStatement ({
				type: ast.type,
				label: ast.label,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "Literal":
			return new AST.Literal ({
				type: ast.type,
				value: ast.value,
                raw: ast.raw,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "MemberExpression":
			return new AST.MemberExpression ({
				type: ast.type,
				computed: ast.computed,
                object: ast.object,
                property: ast.property,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "NewExpression":
			return new AST.NewExpression ({
				type: ast.type,
				callee: AST(ast.callee),
                'arguments': AST(ast.arguments),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ObjectExpression":
			return new AST.ObjectExpression ({
				type: ast.type,
				properties: AST(ast.properties),
                start: ast.range[0],
                end: ast.range[1]
			});

		case "PostfixExpression":
			return new AST.PostfixExpression ({
				type: ast.type,
				operator: ast.operator,
                argument: AST(ast.argument),
                prefix: ast.prefix,
                start: ast.range[0],
                end: ast.range[1]
			});

		case "Program":
			return new AST.Program ({
				type: ast.type,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
				
		case "Property":
			return new AST.Property ({
				type: ast.type,
				key: ast.key,
                value: ast.value,
                kind: ast.kind,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ReturnStatement":
			return new AST.ReturnStatement ({
				type: ast.type,
				argument: AST(ast.argument)
			});
			
		case "SequenceExpression":
			return new AST.SequenceExpression ({
				type: ast.type,
				expressions: AST(ast.expressions),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "SwitchCase":
			return new AST.SwitchCase ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "SwitchStatement":
			return new AST.SwitchStatement ({
				type: ast.type,
				discriminant: AST(ast.discriminant),
                cases: AST(ast.cases),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ThisExpression":
			return new AST.ThisExpression ({
				type: ast.type,
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "ThrowStatement":
			return new AST.ThrowStatement ({
				type: ast.type,
				argument: AST(argument),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "TryStatement":
			return new AST.TryStatement ({
				type: ast.type,
				block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "UnaryExpression":
			return new AST.UnaryExpression ({
				type: ast.type,
				operator: ast.operator,
                argument: AST(ast.argument),
                prefix: ast.prefix,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "VariableDeclaration":
			return new AST.VariableDeclaration ({
				type: ast.type,
				declarations: AST(ast.declarations),
                kind: ast.kind,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "VariableDeclarator":
			return new AST.VariableDeclarator ({
				type: ast.type,
				id: ast.id,
                init: ast.init,
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "WhileStatement":
			return new AST.WhileStatement ({
				type: ast.type,
				test: AST(ast.test),
                body: AST(ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});
			
		case "WithStatement":
			return new AST.WithStatement ({
				type: ast.type,
				object: AST(ast.object),
				body: AST (ast.body),
                start: ast.range[0],
                end: ast.range[1]
			});

		default:
			console.log(ast);
			console.log("No Type:" + ast.type + ", ast=" + ast);
	}
};

AST.ArrayExpression = function (params) {
	this.type = params.type;
    this.elements = params.elements;
    
	this.start = params.start;
    this.end = params.end;

    
    this.toString = function () {
		return this.type;
	};
};

AST.AssignmentExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.left = params.left;
	this.right = params.right;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.BinaryExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.left = params.left;
	this.right = params.right;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.left.toString () + " " + this.operator + " " + this.right.toString ();
	};
};

AST.BlockStatement = function (params) {
	this.type = params.type;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.body.toString ();
	};
};

AST.BreakStatement = function (params) {
	this.type = params.type;
	this.label = params.label;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.CallExpression = function (params) {
	this.type = params.type;
	this.callee = params.callee;
	this.arguments = params.arguments;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.CatchClause = function (params) {
	this.type = params.type;
	this.param = params.param;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ConditionalExpression = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;
	this.alternate = params.alternate;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ContinueStatement = function (params) {
	this.type = params.type;
	this.label = params.label;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.DebuggerStatement = function (params) {
	this.type = params.type;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.DoWhileStatement = function (params) {
	this.type = params.type;
	this.body = params.body;
	this.test = params.test;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.EmptyStatement = function (params) {
	this.type = params.type;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return "";
	};
};

AST.ExpressionStatement = function (params) {
	this.type = params.type;
	this.expression = params.expression;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.expression.toString ();
	};
};

AST.ForStatement = function (params) {
	this.type = params.type;
	this.init = params.init;
	this.test = params.test;
	this.update = params.update;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ForInStatement = function (params) {
	this.type = params.type;
	this.left = params.left;
	this.right = params.right;
	this.body = params.body;
	this.each = params.each;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.FunctionDeclaration = function (params) {
	this.type = params.type;
	this.id = params.id;
	this.params = params.params;
	this.defaults = params.defaults;
	this.body = params.body;
	this.rest = params.rest;
	this.generator = params.generator;
	this.expression = params.expression;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		var result = "function " + this.id.toString ();
		
		var args;
		for (p in this.params) {
			if (args) {
				args += ", " + this.params[p].toString ();
			}
			else {
				args = this.params[p].toString ();
			}
		};
		
		result += " (" + args + ") {\n" + this.body.toString() + "\n};\n";
		
		return result;
	};
};

AST.FunctionExpression = function (params) {
	this.type = params.type;
	this.id = params.id;
	this.params = params.params;
	this.defaults = params.defaults;
	this.body = params.body;
	this.rest = params.rest;
	this.generator = params.generator;
	this.expression = params.expression;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.Identifier = function (params) {
	this.type = params.type;
	this.name = params.name;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.name;
	};
};

AST.IfStatement = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;
	this.alternate = params.alternate;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return "if (" + this.test.toString () + ") {"+this.consequent.toString ()+"}" + (this.alternate?" else {" + this.alternate + "}":"");
	};
};

AST.LabeledStatement = function (params) {
	this.type = params.type;
	this.label = params.label;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.Literal = function (params) {
	this.type = params.type;
	this.value = params.value;
	this.raw = params.raw;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.value.toString ();
	};
};

AST.MemberExpression = function (params) {
	this.type = params.type;
	this.computed = params.computed;
	this.object = params.object;
	this.property = params.property;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.NewExpression = function (params) {
	this.type = params.type;
	this.callee = params.callee;
	this.arguments = params.arguments;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ObjectExpression = function (params) {
	this.type = params.type;
	this.properties = params.properties;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.PostfixExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.argument = params.argument;
	this.prefix = params.prefix;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.Program = function (params) {
	this.type = params.type;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		var result;
		for (var b in this.body) {
			if (!result) {
				result = this.body[b].toString ();
			}
			else {
				result += ";\n" + this.body[b].toString ();
			}
			
		}

		return result;
	};
};

AST.Property = function (params) {
	this.type = params.type;
	this.key = params.key;
	this.value = params.value;
	this.kind = params.kind;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ReturnStatement = function (params) {
	this.type = params.type;
	this.argument = params.argument;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return "return " + this.argument.toString ();
	};
};

AST.SequenceExpression = function (params) {
	this.type = params.type;
	this.expressions = params.expressions;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.SwitchCase = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return "case " + this.test + ": " + this.consequent + ";";
	};
};

AST.SwitchStatement = function (params) {
	this.type = params.type;
	this.discriminant = params.discriminant;
	this.cases = params.cases;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		var result = "switch (" + this.discriminant.toString () + ") {";
		var cases = "";
		for (var c in this.cases) {
			var cond = this.cases[c];
			
			cases += cond.toString ();
		}
		
		result += cases + "}";
		return result;
	};
};

AST.ThisExpression = function (params) {
	this.type = params.type;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ThrowStatement = function (params) {
	this.type = params.type;
	this.argument = params.argument;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.TryStatement = function (params) {
	this.type = params.type;
	this.block = params.block;
	this.guardedHandlers = params.guardedHandlers;
	this.handlers = params.handlers;
	this.finalizer = params.finalizer;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};	
};

AST.UnaryExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.argument = params.argument;
	this.prefix = params.prefix;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.operator + this.argument;
	};
};

AST.VariableDeclaration = function (params) {
	this.type = params.type;
	this.declarations = params.declarations;
	this.kind = params.kind;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return "var " + this.declarations.toString ();
	};
};

AST.VariableDeclarator = function (params) {
	this.type = params.type;
	this.id = params.id;
	this.init = params.init;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.id.toString () + " = " + this.init.toString ();
	};
};

AST.WhileStatement = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.WithStatement = function (params) {
	this.type = params.type;
	this.object = params.object;
	this.body = params.body;

	this.start = params.start;
    this.end = params.end;
	
	this.toString = function () {
		return this.type;
	};
};

AST.parse = function (code) {
	return AST(esprima.parse(code, {range: true}));
};

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
	var args ="fixpoint $" + this.id.toString () + ".";
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
	return this.name;
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
		
	result = "($f.$x." + result+")";
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


module.exports = {
	parse: AST.parse
};
