var jsonlabel=sessionStorage.getItem("whlabel");
var whdet=sessionStorage.getItem("whdetails");
Polymer({
  is: "warehouse-details",
  ready: function() {
    this.warehouselabel=jsonlabel;
    var warehdetails=JSON.parse(whdet);
    this.warehousestorenames=warehdetails;
  },
  whid:function(){
    sessionStorage.setItem("whlocation",this.selectedwh);
  }
});
