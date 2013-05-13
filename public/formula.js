(function(){
  'use strict';

  var scope = this,
      Inheritor,
      instance;

  Inheritor = (function(){
    var self = {},
        name = 'extend',
        Proxy = function(){};

    self[name] = function(fn){
      var Parent = this,
          Child = function(){ this.init.apply(this, arguments); },
          methods = fn( Parent.prototype ),
          i;

      Proxy.prototype = Parent.prototype;
      Child.fn = Child.prototype = new Proxy;
      Child.fn.init = function(){};

      Child[name] = Parent[name];

      for (i in methods){
        if (methods.hasOwnProperty(i)){
          Child.fn[i] = methods[i];
        }
      }
      
      Child.fn.constructor = Parent;
      delete Child.fn;
      return Child;
    };

    return self;
  }());

  scope.FORMula = Inheritor.extend(function(){
    return {
      init: function(){
        console.log('initialized');
      }
    };
  });

  instance = new scope.FORMula();
}).call(this);