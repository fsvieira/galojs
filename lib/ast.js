Lambda.AST = {};

// TODO solve/mk var scope.
function Scope (){
	this.scope = {};
	this.father;
};

Lambda.AST.getVariable = function (scope, varname) {
	  var variable;
	  
	  if (scope) {
		variable = scope.scope[varname] || Lambda.AST.getVariable(scope.father, varname);
		if (!variable) {
			variable = new Lambda.Variable(varname);
			scope.scope[varname] = variable;
		}
	  }
      return variable;	
};

Lambda.AST.Abstraction = function(params, M, funcname, scope) {
  var result = new Lambda.Abstraction(), name;

  if (params) {
	for (var i=params.length-1; i >= 0; i--) {
		name = params[i].name;
		var variable = Lambda.AST.getVariable (scope, name);
		
		if (i===params.length-1) {
			result.x = variable;
			result.M = M;
		}
		else {
			result = new Lambda.Abstraction(variable, result);
		}
	}
  }
  else {
	result.x = new Variable();
	result.M = M;  
  }
  
  result.name = funcname;
  
  return result; 
};

Lambda.AST.AbstractionBody = function (body, scope) {
   switch (body.type) {
    case "ReturnStatement":
      return Lambda.AST.AbstractionBody(body.argument, scope);
        
    case "UnaryExpression":
      switch (body.operator) {
        case '!':
          return new Lambda.Application(Lambda.Logic.Not(), Lambda.AST.AbstractionBody(body.argument, scope));
      }
      break;    

	case "BinaryExpression": 
	  switch (body.operator) {
        case '+':
		  return new Lambda.Application(
					new Lambda.Application(
						Lambda.Logic.Add(), 
						Lambda.AST.AbstractionBody(lambda.genFuncBody(body.left), scope)
					),
					Lambda.AST.AbstractionBody(lambda.genFuncBody(body.right), scope)
				);
      }
      break;    

    case "LogicalExpression":
      switch (body.operator) {
        case '||':
          return new Lambda.Application(
					new Lambda.Application(
						Lambda.Logic.Or(), 
						Lambda.AST.AbstractionBody(body.left, scope)
					),
					Lambda.AST.AbstractionBody(body.right, scope)
				);

        case '&&':
          return new Lambda.Application(
					new Lambda.Application(
						Lambda.Logic.And(), 
						Lambda.AST.AbstractionBody(body.left, scope)
					),
					Lambda.AST.AbstractionBody(body.right, scope)
				);
      }
      break;
          
    case "Identifier":
	  return Lambda.AST.getVariable (scope, body.name);
	  
	case "IfStatement":
      return new Lambda.Application( 
				new Lambda.Application(
					Lambda.AST.AbstractionBody(body.test, scope),
					Lambda.AST.AbstractionBody(body.consequent, scope)
				),
				Lambda.AST.AbstractionBody(body.alternate, scope)
			);
			
	case "BlockStatement":
		// TODO: M is only returning last one.
		var M;
		for (var i in body.body) {
		  M = Lambda.AST.AbstractionBody(body.body[i], scope);
		}
		return M;
	
	case "EmptyStatement":
		return null;
		  	  
	default:
	   print("DEFAULT: Unkown type " + body.type + " at Lambda.AST.AbstractionBody");
  }
  
};

function parse (code) {
	return esprima.parse(code);
};

Lambda.Parse = function (code, result) {
	var AST = esprima.parse(code);
	var scope = new Scope();
	
	print(JSON.stringify(AST));
	result = result || {};
	
	return Lambda.AST.Program(AST, result, scope);
}

Lambda.AST.Program = function (prg, result, scope) {

	switch (prg.type) {
		case 'Program':
		  for (var i in prg.body) {
		    Lambda.AST.Program(prg.body[i], result, scope);
		  } 
		  break;
		  
		case 'FunctionDeclaration':
		  var body = prg.body;
		  var M;
		  
		  var funcScope = new Scope();
		  funcScope.father = scope;
		  
		  scope[prg.id.name] = funcScope;
		  
		  /*for (i in body) {
			M = Lambda.AST.AbstractionBody(body[i], funcScope);
		  }*/
		  M = Lambda.AST.AbstractionBody(body, funcScope);
		  
	      result[prg.id.name] = Lambda.AST.Abstraction(prg.params, M, prg.id.name, funcScope);
		  break;
  }

  return result;	
}
