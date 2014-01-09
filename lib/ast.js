AST = {};

AST.ArrayExpression = function (params) {
	this.type = params.type;
    this.elements = params.elements;
    
    this.toString = function () {
		return this.type;
	};
};

AST.AssignmentExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.left = params.left;
	this.right = params.right;
	
	this.toString = function () {
		return this.type;
	};
};

AST.BinaryExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.left = params.left;
	this.right = params.right;
	
	this.toString = function () {
		return this.left.toString () + " " + this.operator + " " + this.right.toString ();
	};
};

AST.BlockStatement = function (params) {
	this.type = params.type;
	this.body = params.body;
	
	this.toString = function () {
		return this.body.toString ();
	};
};

AST.BreakStatement = function (params) {
	this.type = params.type;
	this.label = params.label;
	
	this.toString = function () {
		return this.type;
	};
};

AST.CallExpression = function (params) {
	this.type = params.type;
	this.callee = params.callee;
	this.arguments = params.arguments;
	
	this.toString = function () {
		return this.type;
	};
};

AST.CatchClause = function (params) {
	this.type = params.type;
	this.param = params.param;
	this.body = params.body;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ConditionalExpression = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;
	this.alternate = params.alternate;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ContinueStatement = function (params) {
	this.type = params.type;
	this.label = params.label;
	
	this.toString = function () {
		return this.type;
	};
};

AST.DebuggerStatement = function (params) {
	this.type = params.type;
	
	this.toString = function () {
		return this.type;
	};
};

AST.DoWhileStatement = function (params) {
	this.type = params.type;
	this.body = params.body;
	this.test = params.test;
	
	this.toString = function () {
		return this.type;
	};
};

AST.EmptyStatement = function (params) {
	this.type = params.type;
	
	this.toString = function () {
		return "";
	};
};

AST.ExpressionStatement = function (params) {
	this.type = params.type;
	this.expression = params.expression;
	
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
	
	this.toString = function () {
		return this.type;
	};
};

AST.Identifier = function (params) {
	this.type = params.type;
	this.name = params.name;
	
	this.toString = function () {
		return this.name;
	};
};

AST.IfStatement = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;
	this.alternate = params.alternate;
	
	this.toString = function () {
		return "if (" + this.test.toString () + ") {"+this.consequent.toString ()+"}" + (this.alternate?" else {" + this.alternate + "}":"");
	};
};

AST.LabeledStatement = function (params) {
	this.type = params.type;
	this.label = params.label;
	this.body = params.body;
	
	this.toString = function () {
		return this.type;
	};
};

AST.Literal = function (params) {
	this.type = params.type;
	this.value = params.value;
	this.raw = params.raw;
	
	this.toString = function () {
		return this.value.toString ();
	};
};

AST.MemberExpression = function (params) {
	this.type = params.type;
	this.computed = params.computed;
	this.object = params.object;
	this.property = params.property;
	
	this.toString = function () {
		return this.type;
	};
};

AST.NewExpression = function (params) {
	this.type = params.type;
	this.callee = params.callee;
	this.arguments = params.arguments;
	
	this.toString = function () {
		return this.type;
	};
};

AST.ObjectExpression = function (params) {
	this.type = params.type;
	this.properties = params.properties;
	
	this.toString = function () {
		return this.type;
	};
};

AST.PostfixExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.argument = params.argument;
	this.prefix = params.prefix;
	
	this.toString = function () {
		return this.type;
	};
};

AST.Program = function (params) {
	this.type = params.type;
	this.body = params.body;
	
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
	
	this.toString = function () {
		return this.type;
	};
};

AST.ReturnStatement = function (params) {
	this.type = params.type;
	this.argument = params.argument;
	
	this.toString = function () {
		return "return " + this.argument.toString ();
	};
};

AST.SequenceExpression = function (params) {
	this.type = params.type;
	this.expressions = params.expressions;
	
	this.toString = function () {
		return this.type;
	};
};

AST.SwitchCase = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.consequent = params.consequent;
	
	this.toString = function () {
		return "case " + this.test + ": " + this.consequent + ";";
	};
};

AST.SwitchStatement = function (params) {
	this.type = params.type;
	this.discriminant = params.discriminant;
	this.cases = params.cases;
	
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
	
	this.toString = function () {
		return this.type;
	};
};

AST.ThrowStatement = function (params) {
	this.type = params.type;
	this.argument = params.argument;
	
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
	
	this.toString = function () {
		return this.type;
	};	
};

AST.UnaryExpression = function (params) {
	this.type = params.type;
	this.operator = params.operator;
	this.argument = params.argument;
	this.prefix = params.prefix;
	
	this.toString = function () {
		return this.operator + this.argument;
	};
};

AST.VariableDeclaration = function (params) {
	this.type = params.type;
	this.declarations = params.declarations;
	this.kind = params.kind;
	
	this.toString = function () {
		return "var " + this.declarations.toString ();
	};
};

AST.VariableDeclarator = function (params) {
	this.type = params.type;
	this.id = params.id;
	this.init = params.init;
	
	this.toString = function () {
		return this.id.toString () + " = " + this.init.toString ();
	};
};

AST.WhileStatement = function (params) {
	this.type = params.type;
	this.test = params.test;
	this.body = params.body;
	
	this.toString = function () {
		return this.type;
	};
};

AST.WithStatement = function (params) {
	this.type = params.type;
	this.object = params.object;
	this.body = params.body;
	
	this.toString = function () {
		return this.type;
	};
};

AST.parse = function (code) {
	return esprima.parse(code);
};

