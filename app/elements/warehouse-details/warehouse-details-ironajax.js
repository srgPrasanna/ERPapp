Polymer({
  is: "warehouse-details-ironajax",
  handleWarehouselabel:function(){
    sessionStorage.setItem("whlabel",this.warehouseddlabel[0].warehouselabel);
    },
  handleWarehouseDetails:function(e){
    var data=e.detail.response.whdata;
    var string=JSON.stringify(data);
    sessionStorage.setItem("whdetails",string);
  }
});
