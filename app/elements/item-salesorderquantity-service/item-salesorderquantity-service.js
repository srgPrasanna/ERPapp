Polymer({
  is: "item-salesorderquantity-service",
  ready:function(){
 alert (" entering new services");
  },
  salesOrderQuantitySum:function(obj)
  {

    this.paramValue=obj;
    this.$.prod.generateRequest();
  },
  responseProduction:function(e){
    var getQty=e.detail.response.message;
    //document.querySelector(name).checkid(id);
    alert("getQty................."+JSON.stringify(getQty));
    // document.querySelector("item-salesorderquantity-service").
  }
});
