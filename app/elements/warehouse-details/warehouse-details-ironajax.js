Polymer({
  is: "warehouse-details-ironajax",
  handleWarehouselabel:function(){
    // sessionStorage.setItem("whlabel",this.warehouseddlabel[0].warehouselabel);
    document.querySelector('warehouse-details').warehouselabel=this.warehouseddlabel[0].warehouselabel;
    },
  handleWarehouseDetails:function(e){
    // var data=e.detail.response.whdata;
    document.querySelector('warehouse-details').warehousestorenames=e.detail.response.whdata;
    // var string=JSON.stringify(data);
    // sessionStorage.setItem("whdetails",string);
  }
});
