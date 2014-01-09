// http://pegjs.majda.cz/online

start = lambda

lambda = 
  app:(
     space* 
        l:( abstraction 
          / variable  
          / "(" lambda:lambda ")" {return lambda;} 
        ) {return l;}
     )+ space*
 {
   var result = app[0];
   for (var i=1; i< app.length; i++) {
     result = {
       type: "application",
       M: result,
       N: app[i]
     };
   }
  
   return result;
 }

variable
  = note:note? 
    id:([a-zA-Z0-9]+)
  {
    return {
       type: "variable",
       varname: id.join(""),
       note: note
    }; 
  }

abstraction
  = note:note? "$" param:variable "." body:lambda 
  {
    return {
      type: "abstraction",
      x: param,
      M: body,
      note: note
    }
  }

note
  = space* "{" note:[^}]+ "}" space* {return note.join("");}

space = [ \t\n]

