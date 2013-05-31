var MyForm = FORMula.extend( function(super_){
  return {
    init: function(config){
      super_.init.apply(this, arguments);
      console.log(this.$form);
    }
  };
} );

var myform = new MyForm({
  form: 'simple_form'
});