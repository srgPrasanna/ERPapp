(function() {
  'use strict';
  var item1;
  var autoc_item_name="";
  var autoc_item_id="";
  Polymer({
    is: 'item-details',
    jsonlabel:function(itemid,itemname,itemdescription,itemspecification1,itemspecification2,itemcontainer,itemunit,itemgroup,itemtype,itemstatus,itempurchasetype){
      this.itemid=itemid;
      this.itemname=itemname;
      this.itemdescription=itemdescription;
      this.itemspecification1=itemspecification1;
      this.itemspecification2=itemspecification2;
      this.itemcontainer=itemcontainer;
      this.itemunit=itemunit;
      this.itemgroup=itemgroup;
      this.itemtype=itemtype;
      this.itemstatus=itemstatus;
      this.itempurchasetype=itempurchasetype;
    },
    locationdata:function(e){
      var itemdata=e;
      this.selectedtype=itemdata[0].itemtypeid;
      this.itemspec1=itemdata[0].itemspecification1;
      this.selectedcontainer=itemdata[0].containerid;
      this.whlocation=itemdata[0].warehouselocation;
    },
    saveitems:function(){
      document.querySelector('check-autogenid').call();
      // alert(autoid);
      // var whloc=sessionStorage.getItem("whlocation");
      // var obj={};
      // obj.id=autoid;
      // obj.name=this.value1;
      // obj.description=this.idescription;
      // obj.specification1=this.ispecification1;
      // obj.specification2=this.ispecification2;
      // obj.container=this.selectedcontainer;
      // obj.unit=this.selectedunit;
      // obj.group=this.selectedgroup;
      // obj.type=this.selectedtype;
      // obj.ptype=this.selectedptype;
      // obj.warehouselocation=whloc;
      // obj.itemstatus="Created";
      // document.querySelector("item-details-ironajax").send(obj);
      // document.querySelector('#disablebutton').disabled=false;
      // document.querySelector('item-to-addsupplier').selectitem=this.value1;
    },
    searchdetails:function(){
      var obj={};
      obj.name=this.value1;
      document.querySelector("item-details-ironajax").sendresponse(obj);
      document.querySelector('item-to-addsupplier').selectitem=this.value1;
      document.querySelector("#savebutton").style.display="none";
    },
    searchbind:function(items,suppliers){
     this.value1=items[0].item_name;
     this.idescription=items[0].item_description;
     this.ispecification1=items[0].item_specification1;
     this.ispecification2=items[0].item_specification2;
     this.selectedcontainer=items[0].container_id;
     this.selectedunit=items[0].unit_of_measure_id;
     this.selectedgroup=items[0].item_group;
     this.selectedtype=items[0].item_type_id;
     this.selectedptype=items[0].item_purchase_type;
     this.suppliers=suppliers;
     document.querySelector('warehouse-details').selectedwh=items[0].warehouse_stores_id;
     document.querySelector('#disablebutton').disabled=false;
    },
    addsupplier:function(){
      document.querySelector('home-page').FnSetPage("call-add-supplier");
      document.querySelector('addsupplier-dynamic').itemid(this.iid);
    },
    supplierid:function(sid){
      this.sid=sid;
    },
    openmapping:function(){
      this.colvar="false";
      this.$.collapse.toggle();
      this.page="item-to-addsupplier";
    },
    expand:function(){
      this.page="";
      if(this.colvar=="true"){
        this.colvar="true";
      }
      else{
        this.colvar="true";
      }
    },
    save:function(id){
      // autoid=x;
      var whloc=sessionStorage.getItem("whlocation");
      var obj={};
      obj.id=id;
      obj.name=this.value1;
      obj.description=this.idescription;
      obj.specification1=this.ispecification1;
      obj.specification2=this.ispecification2;
      obj.container=this.selectedcontainer;
      obj.unit=this.selectedunit;
      obj.group=this.selectedgroup;
      obj.type=this.selectedtype;
      obj.ptype=this.selectedptype;
      obj.warehouselocation=whloc;
      obj.itemstatus="Created";
      document.querySelector("item-details-ironajax").send(obj);
      document.querySelector('#disablebutton').disabled=false;
      document.querySelector('item-to-addsupplier').selectitem=this.value1;
    },
    ContainerData:function(y){
      this.containerNames=y;
    },
    TypeData:function(y){
      this.itemtypeNames=y;
    },
    UnitofMeasureData:function(y){
      this.itemUnit=y;
    },
    //autocomplete***********
    FnSearchEnquiry1:function(e){
      item1=this.tempitemname1;
        if(e.keyCode==13|| e.keyCode==40)
        this.querySelector('#transportinput3').focus();
        var arr=[];
        // arr.push({"itemdes1":"--Select--"});
        this.querySelector('#transportinput3').style.visibility='visible';
        if(e.keyCode==8){
          this.itemflag1="true";
          this.itemval1="";
          var len=(this.value1).length;
          if(len<=1){
            this.querySelector('#transportinput3').style.visibility='hidden';
            this.itemArray1="";
            this.itemval1="";
          }
          if(len>1){
            this.querySelector('#transportinput3').style.visibility='visible';
            var backsubval=(((this.value1).substring(0,(len-1))).trim()).toUpperCase();
            for(var i=0;i<item1.length;i++)
            {
              var subval=((item1[i].item_name).trim()).substring(0,backsubval.length);
              if((item1[i].item_name).toUpperCase().indexOf((this.value1).toUpperCase())!=-1)
              {
                var obj1={"itemdes1":"","enquiry_no":""};
                obj1.itemdes1=item1[i].item_name;
                obj1.item_id=item1[i].item_id;
                arr.push(obj1);
              }
            }
            this.itemArray1=arr;
          }
        }
        if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
          if(this.itemflag1=="true") {
            this.itemval1 = (this.value1).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
            this.itemflag1="false";
          }
          else
          this.itemval1 = this.value1 +String.fromCharCode((e.keyCode));
          if(this.itemval1.length>0)
          {
            for(var i=0;i<item1.length;i++)
            {
              var subval=((item1[i].item_name).trim()).substring(0,this.itemval1.length);
              if((item1[i].item_name).toUpperCase().indexOf((this.itemval1).toUpperCase())!=-1)
              {
                var obj1={"itemdes1":"","enquiry_no":""};
                obj1.itemdes1=item1[i].item_name;
                obj1.item_id=item1[i].item_id;
                arr.push(obj1);
              }
            }
            if(arr.length>0)
              this.itemArray1=arr;
            else
            {
              var obj1={"itemdes1":"","enquiry_no":""};
              obj.itemdes1="No items found";
              arr.push(obj1);
              this.itemArray1=arr;
            }
          }
        }


        },
        //customerid

        FnSelectEnquiry2:function(e){
        this.querySelector('#transportinput3').style.visibility='hidden';
        autoc_item_name = e.target.selectedItem.textContent.trim();
        autoc_item_id = e.target.selectedItem.value.trim();
        this.itemArray1=[];
        document.querySelector('#transportinput3').selected=-1;
        this.value1=autoc_item_name;
        // alert(supplier_name);
        // document.querySelector('intentpurchase-process-ironajax').searchitem(this.value1);
        // document.querySelector('purchase-card').itemname1=supplier_name;
      },
    //autocomplete***********End
    check1:function(x){
        alert(x);
    }
  });
})();
