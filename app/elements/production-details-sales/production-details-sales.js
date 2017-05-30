Polymer({
  is: "production-details-sales",
  ready:function()
  {
    var jsonObject={};
    jsonObject.order_itemid="FLUX02";
    jsonObject.order_itemdate="29-02-2017";
    jsonObject.order_itemstatus="Order placed";
    document.querySelector("item-salesorderquantity-service").salesOrderQuantitySum(jsonObject);
    alert('jsonObject'+JSON.stringify(jsonObject));
  },

});
