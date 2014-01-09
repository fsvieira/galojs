var Lambda = {};

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

// Alpha Conversion:
Lambda.Application.prototype.alphaConversion = function (variable, value) {
  this.M = this.M.alphaConversion (variable, value);
  this.N = this.N.alphaConversion (variable, value);

  return this;
};

Lambda.Abstraction.prototype.alphaConversion = function (variable, value) {
  if (this.x === variable || this.x.varname !== variable.varname) {
	this.x = this.x.alphaConversion (variable, value);
	this.M = this.M.alphaConversion (variable, value);
  }
  return this;
};

Lambda.Variable.prototype.alphaConversion = function (variable, value) {
  return (this.varname === variable.varname)?value: this;
};

function verbose(show, msg) {
	if (show) {
		print(msg);
	}
}

// Beta Reduction
Lambda.Application.prototype.betaReduction = function (options) {
	var result = this;
		
  if (this.M instanceof Lambda.Abstraction) {
		verbose(options.verbose, "Application: this.M.betaReduction(options.rec, this.N); // M is an abstraction!");
		
    result = this.M.betaReduction(options, this.N);

	  verbose(options.verbose, "Application: return result;");
  }
  else if (this.M instanceof Lambda.Application) {
	  verbose(options.verbose, "Application: this.M = this.M.betaReduction(options); // M is an application!");
    this.M = this.M.betaReduction(options);
  }

	if (options.rec) {
		result = result.betaReduction(options);
	}

  return result;
}

Lambda.Abstraction.prototype.betaReduction = function (options, value) {
  var r = this;
  verbose(options.verbose, "Abstraction: r = this;");

  if (value) {
	  verbose(options.verbose, "Abstraction: r = this.M.alphaConversion (this.x, value.clone());");
    r = this.M.alphaConversion (this.x, value);
    
    if (options.rec) {
		  verbose(options.verbose, "Abstraction: return r.betaReduction(options);");
			return r.betaReduction(options);
		}
  }

  verbose(options.verbose, "Abstraction: return r;");
  return r;
}

Lambda.Variable.prototype.betaReduction = function (options) {
  verbose(options.verbose, "return this; // variable " + this.toString());
  return this;
};


Lambda.parse = function (code) {
  var l = lambda.parse(code);
  console.log(JSON.stringify(l));
  
  function mkLambda (l) {
	  switch (l.type) {
		  case "application": return new Lambda.Application (mkLambda(l.M), mkLambda(l.N));
  		  case "abstraction": return new Lambda.Abstraction (mkLambda(l.x), mkLambda(l.M), l.note);
		  case "variable": return new Lambda.Variable (l.varname, l.note);
	  }
  }
  
  return mkLambda(l);
};


// Clones:
/*
Lambda.Variable.prototype.clone = function (vars) {
  vars = vars || {original: [], replace: []};
  
  var index = vars.original.indexOf(this);
  if (index === -1) {
     var x = new Lambda.Variable (this.varname);
     vars.original.push(this);
     vars.replace.push(x);
     return x;
  }
  else {
    return vars.replace[index];
  }
};

Lambda.Abstraction.prototype.clone = function (vars) {
  vars = vars || {original: [], replace: []};
  
  var v = this.x.clone(vars);
  this.M.clone(vars).alphaConversion (this.x, v);
  return new Lambda.Abstraction (v, this.M.clone(vars).alphaConversion (this.x, v), this.name);
};

Lambda.Application.prototype.clone = function (vars) {
  return new Lambda.Application (this.M.clone(vars), this.N.clone(vars));
};
*/

// To string:
Lambda.Application.prototype.toString = function () {
  return '(' + this.M.toString () + " " + this.N.toString() + ")";
};

Lambda.Abstraction.prototype.toString = function () {
  return (this.note?("{" + this.note + '}'):'') + '&lambda;' + this.x.toString () + '.' + this.M.toString ();
};

Lambda.Variable.prototype.toString = function () {
  return (this.note?("{" + this.note + '}'):'') + this.varname || "";
};


// Utils:
/*
Lambda.Abstraction.prototype.apply = function (args) {
	var app = this.clone();

	for (i in args) {
		app = new Lambda.Application(app, args[i]);
	}

	return app;
}
*/

/*

// Make tree
Lambda.Application.prototype.toCode = function (first) {
  var M = this.M?this.M.toCode():'undefined';
  var N = this.N?this.N.toCode():'undefined';
  
  return 'new Lambda.Application (<div style="margin: 4px">' + M + ', ' + N + '</div>)';
};

Lambda.Abstraction.prototype.toCode = function (first) {
  var x = this.x?this.x.toCode():'undefined';
  var M = this.M?this.M.toCode():'undefined';
	
  return 'new Lambda.Abstraction (<div style="margin: 4px">' + x + ', ' + M + (this.name?(',' + this.name):'') + '</div>)';
};

Lambda.Variable.prototype.toCode = function (first) {
  return "new Lambda.Varname (<div style='margin: 4px'>" + (this.varname || "") + "</div>)";
};




Lambda.Application.prototype.getVar = function (name) {
  return this.N.getVar(name) || this.N.getVar(name);
};

Lambda.Abstraction.prototype.getVar = function (name) {
  if (this.x && this.x.name !== name) {
	return this.M.getVar(name);
  }
};

Lambda.Variable.prototype.getVar = function (name) {
  if (this.varname && this.varname === name) {
	return this;
  }
};



// Variables
Lambda.Variable.prototype.variables = function (vars) {

  vars = vars || {bound: [], free: []};

  if (vars.bound.indexOf (this) === -1) {
    if (vars.free.indexOf (this) === -1) {
      vars.free.push (this);
    }
  }

  return vars;
};

Lambda.Abstraction.prototype.variables = function (vars) {
  vars = vars || {bound: [], free: []};

  vars.bound.push (this.x);

  return this.M.variables (vars);
};

Lambda.Application.prototype.variables = function (vars) {
  vars = this.M.variables (vars);
  vars = this.N.variables (vars);

  return vars;
};

*/

