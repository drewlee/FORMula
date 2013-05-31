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
          Child = function(){
            this.init.apply(this, arguments);
          },
          methods = fn( Parent.prototype ),
          i;

      Proxy.prototype = Parent.prototype;
      Child.fn = Child.prototype = new Proxy();
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

  var FORMula = Inheritor.extend(function(){
    var CONFIG = {
      DATA_ERRORS = 'frml-errors'
    };

    return {
      init: function(config){
        /*
         * Parse form content to find the fields that need validation
         * Attach blur event listeners
         * onblur, validate format
         * display error messages
         * disable the submit button
         */
        if (!config || !config.form){
          return;
        }

        this._errorManager = {};
        this.events = FORMula.EventBus();

        this.form = document.forms[config.form];
        this.$form = $(this.form);

        this.$field = $(this.form.fname);

        var data = this.$field.data('frml-errors');
        data = this.parseAttr(data);

        console.log(data);
        

        //this.$all = this.$form.find();

        this.$submit = this.$form.find('input[type=submit]');

        console.log('initialized');
      },

      parseAttr: function(attr){
        var data = attr.replace(/.'/g, function(str){
            if (str.indexOf('\\') === 0){
                return str.charAt(1);
            }
            return str.charAt(0) + '"';
        });

        return JSON.parse(data);
      },

      handleSubmit: function(evt){

      }
    };
  });

  FORMula.EventBus = function(){
    return $({});
  };

  scope.FORMula = FORMula;
}).call(this);