(function() {
  'use strict';
  Polymer({
    is: 'slider-barnew',
    sliderfunction:function(arr)
 {
  var orderquantity=arr[0].orderquantity;
  var itemavailablequantity=arr[0].itemavailablequantity;
    this.max1=orderquantity;
    this.value1=itemavailablequantity;

 }
  });
})();
