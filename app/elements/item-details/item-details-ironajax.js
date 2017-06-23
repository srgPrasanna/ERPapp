  Polymer({
    is:"item-details-ironajax",
    itemContainerResponse:function(x){
      document.querySelector("item-details").ContainerData(x.detail.response.returnval);
    },
    itemTypeResponse:function(x){
      document.querySelector("item-details").TypeData(x.detail.response.returnval);
    },
    itemUnitResponse:function(x){
      document.querySelector("item-details").UnitofMeasureData(x.detail.response.returnval);
    },
    itemdetailslabel:function(){
      var array=this.itemjsonlabel;
      document.querySelector("item-details").jsonlabel(array[0].itemid,
                                                       array[0].itemname,
                                                       array[0].itemdescription,
                                                       array[0].itemspecification1,
                                                       array[0].itemspecification2,
                                                       array[0].itemcontainer,
                                                       array[0].itemunit,
                                                       array[0].itemgroup,
                                                       array[0].itemtype,
                                                       array[0].itemstatus,
                                                       array[0].itempurchasetype)
    },
    send:function(jsinputs){
      var testurl=sessionStorage.getItem("url");
      this.requesturl=testurl+"/insertitems";
      this.writeparam=jsinputs;
      this.$.writeajax.generateRequest();
    },
    itemResponse:function(e){
      alert(e.detail.response.returnval);
    },
    sendresponse:function(search){
      this.responseurl="http://localhost:4000"+"/searchitem";
      this.readparam=search;
      this.$.readajax.generateRequest();
    },
    searchitemdetails:function(e){
      var items=e.detail.response.returnval;
      var suppliers=e.detail.response.returnval1;
      document.querySelector("item-details").searchbind(items,suppliers);
    },
    bindsearchdata:function(){
      document.querySelector("item-details").searchbind(this.searchjsondata);
    },
    autocompletearr:function(e)
    {
      document.querySelector('item-details').tempitemname1=e.detail.response.returnval;
    },
    ready:function(){
      this.labeljsonurl="elements/item-details/item-details-label.json";
      var globalurl=sessionStorage.getItem("url");
      this.itemuniturl=globalurl+"/itemUnit";
    }
  });
