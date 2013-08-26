Lambda.Collection = {};
Lambda.Collection.Pair = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');
  var f = new Lambda.Variable ('f');

  return new Lambda.Abstraction (
    a,
    new Lambda.Abstraction (
      b,
      new Lambda.Abstraction (
        f,
        new Lambda.Application (
          new Lambda.Application (f, a),
          b
        )
      )
    ),
    'Pair'
  );
};


Lambda.Collection.First = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');
  var p = new Lambda.Variable ('p');

  return new Lambda.Abstraction (
    p,
    new Lambda.Application (
      p,
      new Lambda.Abstraction (
        a, new Lambda.Abstraction (b,a)
      )
    ),
    'First'
  );
};

Lambda.Collection.Second = function () {
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');
  var p = new Lambda.Variable ('p');

  return new Lambda.Abstraction (
    p,
    new Lambda.Application (
      p,
      new Lambda.Abstraction (
        a, new Lambda.Abstraction (b,b)
      )
    ),
    'Second'
  );
};

Lambda.Collection.List = {};

Lambda.Collection.List.Empty = function () {
  var f = new Lambda.Variable ('f');
  var x = new Lambda.Variable ('x');

  return new Lambda.Abstraction (
    f, new Lambda.Abstraction (x, x)
  );
};

// append = λalfx.fa(lfx)
Lambda.Collection.List.Append = function () {
  var a = new Lambda.Variable ('a');
  var l = new Lambda.Variable ('l');
  var f = new Lambda.Variable ('f');
  var x = new Lambda.Variable ('x');

  return new Lambda.Abstraction (a,
    new Lambda.Abstraction (l,
      new Lambda.Abstraction (f,
        new Lambda.Abstraction (x,
          new Lambda.Application (
            new Lambda.Application (f, a),
            new Lambda.Application (l, new Lambda.Application (f, x))
          )
        )
      )
    )
  );
};

// head = λl.l(λab.a)(any expression)
Lambda.Collection.List.Head = function (t) {
  var l = new Lambda.Variable ('l');
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction (l,
      new Lambda.Application (
        new Lambda.Application (l,
          new Lambda.Abstraction (a,
            new Lambda.Abstraction (b,
              a
            )
          )
        ),
        t
      )
    );
    
};


Lambda.Collection.List.IsEmpty = function () {
  var l = new Lambda.Variable ('l');
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction (l,
    new Lambda.Application (
      new Lambda.Application (l,
        new Lambda.Abstraction (a,
          new Lambda.Abstraction (b,
            Lambda.Logic.False()
          )
        )
      ),
      Lambda.Logic.True()
    )
  );
};
    /*empty = λfx.x
    append = λalfx.fa(lfx)
    
    isempty = λl.l(λab.false)true
    tail=λl.first(l (λab.pair(second b)(append a (second b)))(pair empty empty)) */

Lambda.Collection.List.Tail = function () {
  var l = new Lambda.Variable ('l');
  var a = new Lambda.Variable ('a');
  var b = new Lambda.Variable ('b');

  return new Lambda.Abstraction (l,
      Lambda.Collection.First(),
      new Lambda.Application (
        new Lambda.Application (l,
          new Lambda.Abstraction (a,
            new Lambda.Abstraction (b,
              new Lambda.Application (
                new Lambda.Application (new Lambda.Collection.Pair(), new Lambda.Application (new Lambda.Collection.Second(), b)),
                new Lambda.Application (
                  new Lambda.Application (Lambda.Collection.List.Append(), a),
                  new Lambda.Application (Lambda.Collection.Second(), b)
                )
              )
            )
          )
        ),
        new Application (
          new Application (Lambda.Collection.Pair,
            Lambda.Collection.List.Empty()
          ),
          Lambda.Collection.List.Empty()
        )
      )
    );

}


