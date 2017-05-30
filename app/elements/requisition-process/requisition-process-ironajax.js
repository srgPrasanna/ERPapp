Polymer({
  is: "requisition-process-ironajax",
  searchitem:function(e){
    var json={};
    json.itemname=e;
    this.searchitemparam=json;
    this.$.searchitem.generateRequest();
  },
  handlerequisitionsave:function(e){
    alert(e.detail.response.status)
  },
  handlerequisitionlabel:function(){
    document.querySelector("requisition-process").requisitionlabel(this.requisitionlabel);
  },
  handleItems:function(e){
    document.querySelector("requisition-process").itemdata(e.detail.response.itemdetails);
  },
  savedata:function(data){
    this.requisitionparam=data;
    this.$.requisitionia.generateRequest();
  },
  handlerequisitionitems:function(e){
    document.querySelector('requisition-process').itemnames=e.detail.response.itemnames;
    document.querySelector('requisition-process').tempitemname1=e.detail.response.itemnames;
  }
});
