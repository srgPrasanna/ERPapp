Polymer({
  is: "requisition-stores-ironajax",
  handleRequisitionStores:function(x){
    document.querySelector('requisition-stores').storesRequisitions(x.detail.response.requisitionstoresdata);
  }
});
