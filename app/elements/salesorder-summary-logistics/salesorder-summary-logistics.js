(function() {
  'use strict';
  Polymer({
    is: 'salesorder-summary-logistics',
    ready:function(){
      alert("working");
    },
    fetchfunction:function(array1){
      this.jsondata=array1;
      alert("ok");
    }
 });
})();
