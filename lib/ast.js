function AST (ast) {
	if (!ast) return ast;

	if (ast.length) {
		var r = [];
		for (var i in ast) {
			r[i] = AST(ast[i])
		}
		
		return r;
	}

	console.log (ast.type);
	switch (ast.type) {
		case "ArrayExpression":
			return new AST.ArrayExpression ({
				type: ast.type,
                elements: AST(ast.elements)
			});
		case "AssignmentExpression":
			return new AST.AssignmentExpression ({
				type: ast.type,
                operator: ast.operator,
                left: AST(ast.left),
                right: AST(ast.right)
			});
			
		case "BinaryExpression":
			return new AST.BinaryExpression ({
				type: ast.type,
                operator: ast.operator,
                left: AST(ast.left),
                right: AST(ast.right)
			});
			
		case "BlockStatement":
			return new AST.BlockStatement ({
				type: ast.type,
				body: AST (ast.body)
			});
			
		case "BreakStatement":
			return new AST.BreakStatement ({
				type: ast.type,
				label: ast.label
			});
			
		case "CallExpression":
			return new AST.CallExpression ({
				type: ast.type,
				callee: AST(ast.callee),
                'arguments': AST(ast.arguments)
			});
			
		case "CatchClause":
			return new AST.CatchClause ({
				type: ast.type,
				param: AST(ast.param),
				body: AST (ast.body)
			});
			
		case "ConditionalExpression":
			return new AST.ConditionalExpression ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent),
                alternate: AST(ast.alternate)
			});
			
		case "ContinueStatement":
			return new AST.ContinueStatement ({
				type: ast.type,
				label: ast.label
			});
			
		case "DebuggerStatement":
			return new AST.DebuggerStatement ({
				type: ast.type
			});
			
		case "DoWhileStatement":
			return new AST.DoWhileStatement ({
				type: ast.type,
				body: AST (ast.body),
				test: AST(ast.test)
			});
			
		case "EmptyStatement":
			return new AST.EmptyStatement ({
				type: ast.type
			});
			
		case "ExpressionStatement":
			return new AST.ExpressionStatement ({
				type: ast.type,
				expression: AST(ast.expression)
			});
			
		case "ForStatement":
			return new AST.ForStatement ({
				type: ast.type,
				init: AST(ast.init),
                test: AST(ast.test),
                update: AST(ast.update),
				body: AST (ast.body)
			});
			
		case "ForInStatement":
			return new AST.ForInStatement ({
				type: ast.type,
				left: AST(ast.left),
                right: AST(ast.right),
                each: ast.each,
				body: AST (ast.body)
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
                expression: ast.expression
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
				body: AST (ast.body)
			});
			
		case "Identifier":
			return new AST.Identifier ({
				type: ast.type,
				name: ast.name
			});
			
		case "IfStatement":
			return new AST.IfStatement ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent),
                alternate: AST(ast.alternate)
			});
			
		case "LabeledStatement":
			return new AST.LabeledStatement ({
				type: ast.type,
				label: ast.label,
				body: AST (ast.body)
			});
			
		case "Literal":
			return new AST.Literal ({
				type: ast.type,
				value: ast.value,
                raw: ast.raw
			});
			
		case "MemberExpression":
			return new AST.MemberExpression ({
				type: ast.type,
				computed: ast.computed,
                object: ast.object,
                property: ast.property
			});
			
		case "NewExpression":
			return new AST.NewExpression ({
				type: ast.type,
				callee: AST(ast.callee),
                'arguments': AST(ast.arguments)
			});
			
		case "ObjectExpression":
			return new AST.ObjectExpression ({
				type: ast.type,
				properties: AST(ast.properties)
			});

		case "PostfixExpression":
			return new AST.PostfixExpression ({
				type: ast.type,
				operator: ast.operator,
                argument: AST(ast.argument),
                prefix: ast.prefix
			});

		case "Program":
			return new AST.Program ({
				type: ast.type,
				body: AST (ast.body)
			});
				
		case "Property":
			return new AST.Property ({
				type: ast.type,
				key: ast.key,
                value: ast.value,
                kind: ast.kind
			});
			
		case "ReturnStatement":
			return new AST.ReturnStatement ({
				type: ast.type,
				argument: AST(ast.argument)
			});
			
		case "SequenceExpression":
			return new AST.SequenceExpression ({
				type: ast.type,
				expressions: AST(ast.expressions)
			});
			
		case "SwitchCase":
			return new AST.SwitchCase ({
				type: ast.type,
				test: AST(ast.test),
                consequent: AST(ast.consequent)
			});
			
		case "SwitchStatement":
			return new AST.SwitchStatement ({
				type: ast.type,
				discriminant: AST(ast.discriminant),
                cases: AST(ast.cases)
			});
			
		case "ThisExpression":
			return new AST.ThisExpression ({
				type: ast.type,
				body: AST (ast.body)
			});
			
		case "ThrowStatement":
			return new AST.ThrowStatement ({
				type: ast.type,
				argument: AST(argument)
			});
			
		case "TryStatement":
			return new AST.TryStatement ({
				type: ast.type,
				block: block,
                guardedHandlers: guardedHandlers,
                handlers: handlers,
                finalizer: finalizer
			});
			
		case "UnaryExpression":
			return new AST.UnaryExpression ({
				type: ast.type,
				operator: ast.operator,
                argument: AST(ast.argument),
                prefix: ast.prefix
			});
			
		case "VariableDeclaration":
			return new AST.VariableDeclaration ({
				type: ast.type,
				declarations: AST(ast.declarations),
                kind: ast.kind
			});
			
		case "VariableDeclarator":
			return new AST.VariableDeclarator ({
				type: ast.type,
				id: ast.id,
                init: ast.init
			});
			
		case "WhileStatement":
			return new AST.WhileStatement ({
				type: ast.type,
				test: AST(ast.test),
                body: AST(ast.body)
			});
			
		case "WithStatement":
			return new AST.WithStatement ({
				type: ast.type,
				object: AST(ast.object),
				body: AST (ast.body)
			});

		default:
			console.log("No Type:" + ast.type);
	}
};

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
	return AST(esprima.parse(code, {range: true}));
};

