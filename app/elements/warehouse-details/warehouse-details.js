Polymer({
  is: "warehouse-details",
  whid:function(){
    sessionStorage.setItem("whlocation",this.selectedwh);
  }
});
