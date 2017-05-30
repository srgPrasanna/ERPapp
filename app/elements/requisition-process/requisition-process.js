var iid;
var itemtypeid;
var warehouseid;
var item1;
var autoc_item_name="";
var autoc_item_id="";
Polymer({
  is: "requisition-process",
  searchWHLocation:function(){
    document.querySelector("requisition-process-ironajax").searchlocation(this.itemname);
  },
  requisitionlabel:function(requisitionlabel){
    this.typelabel=requisitionlabel[0].itemtype;
    this.namelabel=requisitionlabel[0].itemname;
    this.spec1label=requisitionlabel[0].itemspecification1;
    this.whloclabel=requisitionlabel[0].warehouselocation;
    this.containerlabel=requisitionlabel[0].itemcontainer;
    this.itemquantitylabel=requisitionlabel[0].itemquantity;
  },
  saverequisition:function(){
    document.querySelector('check-autogenid').call();
  },
  searchitem:function(){
    document.querySelector('requisition-process-ironajax').searchitem(this.value1);
  },
  itemdata:function(e){
    iid=e[0].item_id;
    itemtypeid=e[0].item_type_id;
    this.selectedtype=e[0].item_type_name;
    this.itemspec1=e[0].item_specification1;
    this.whlocation=e[0].warehouse_stores_name;
    this.selectedcontainer=e[0].container_name;
    this.unitofmeasure=e[0].unit_of_measure_name;
    warehouseid=e[0].warehouse_stores_id;
  },
  save:function(id){
    var json={};
    json.requisitionid=id;
    json.iid=iid;
    json.selectedtype=itemtypeid;
    json.itemspec1=this.itemspec1;
    json.whlocation=warehouseid;
    json.selectedcontainer=this.selectedcontainer;
    json.itemquantity=this.itemquantity;
    json.requisitiondate=this.requisitiondate;
    json.requireddate=this.min;
    document.querySelector('requisition-process-ironajax').savedata(json);
  },
  //autocomplete***********
  FnSearchEnquiry1:function(e){
    item1=this.tempitemname1;
      if(e.keyCode==13|| e.keyCode==40)
      this.querySelector('#transportinput3').focus();
      var arr=[];
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
      FnSelectEnquiry2:function(e){
      this.querySelector('#transportinput3').style.visibility='hidden';
      autoc_item_name = e.target.selectedItem.textContent.trim();
      autoc_item_id = e.target.selectedItem.value.trim();
      this.itemArray1=[];
      document.querySelector('#transportinput3').selected=-1;
      this.value1=autoc_item_name;
    },
  //autocomplete***********End
});
