var billsupplierid;
Polymer({
  is:"call-add-supplier",

  ready:function(){
    this.colvar="true";
  },
  clickFN:function(){
    if(this.colvar=="false"){
    this.$.suppliercollapse.toggle();
      }
  else{
    this.colvar="true";
      }
  },
  additemFn:function(){
    this.colvar="false";
    this.$.suppliercollapse.toggle();
    this.page="supplier-to-additem";
    document.querySelector("supplier-to-additem").check();
    document.querySelector("call-add-supplier").passsupplieridFn(this.suid);
  },
  passsupplieridFn:function(data){
    document.querySelector("supplier-to-additem").getsupplieridFn(this.suid);
  },
  getironpageFn:function(data){
    this.page="item-display";
    document.querySelector("item-display").getdataFn(data);
  },
  savebuttonFn:function(){
    document.querySelector("autogen-id").send("sup");
  },
  submitFn:function(data){
    document.querySelector('#additemid').disabled=false;
    var postvalue ={
                    "sidval":data,
                    "snameval":this.SupNameval,
                    "adval1"  :this.Add1val,
                    "adval2"  :this.Add2val,
                    "adval3"  :this.Add3val,
                    "countryVal":this.selection,
                    "stateVal":this.selectionstate,
                    "citynameval"  :this.Citynameval,
                    "pinval"  :this.Pinval,
                    "mobnumval1"  :this.MobNumberval1,
                    "mobnumval2"  :this.MobNumberval2,
                    "emidval"  :this.EmIDval,
                    "statusval":"created"
                  };
                  this.suid=this.SupIdval;
          document.querySelector("call-add-supplier-ironajax").to_ironajax(postvalue);
          },
  supplierFun:function(){
    this.$.cardact.toggle();
    },

  labelFn:function(d1){
    this.inputfield=d1;
    },

  getJsondata:function(sid,sname,Ad_1,Ad_2,Ad_3,country,ste,city,pin,mob1,mob2,email,status){
    this.Supid=sid;
    this.SupName=sname;
    this.Add1=Ad_1;
    this.Add2=Ad_2;
    this.Add3=Ad_3;
    this.countryname=country;
    this.State=ste;
    this.Cityname=city;
    this.Pin=pin;
    this.MobNumber1=mob1;
    this.MobNumber2=mob2;
    this.EmID=email;
    this.statuslabel=status;
  },
  datafetchFn:function(data){
    billsupplierid=data[0].supplier_id;
    this.SupIdval=data[0].supplier_id;
    this.value1=data[0].supplier_name;
    this.Add1val=data[0].address_1;
    this.Add2val=data[0].address_2;
    this.Add3val=data[0].address_3;
    this.selection=data[0].country;
    this.selectionstate=data[0].state;
    this.Citynameval=data[0].city;
    this.Pinval=data[0].pincode;
    this.MobNumberval1=data[0].mobile_1;
    this.MobNumberval2=data[0].mobile_2;
    this.EmIDval=data[0].email;
    this.staval=data[0].status;
    this.suid=this.SupIdval;
  },
  getcountryjsondata:function(retrvjsondata){
    this.countryitems=retrvjsondata;
  },
  selectCountryFn:function(){
    document.querySelector("call-add-supplier-ironajax").countryjsoninfo(this.selection);
  },
  getstatejsondata:function(getData){
    this.stateitems=getData;
  },
  searchitemdet:function(){
    if(this.SupNameval!=""){
    document.querySelector("#anchorID").style.display="none";
     document.querySelector('#additemid').disabled=false;
    var obj={supname:this.SupNameval};
    document.querySelector("call-add-supplier-ironajax").searchsidFN(obj);
  }
  else {
    alert("please enter supplier name");
  }
},
  addBillAddress:function(){
    this.page="billing";
    document.querySelector('#billcustomername').value=this.SupNameval;
  },
  billShipButton:function(x){
    if(x.length>0){
      document.querySelector('#billShipButtonid').disabled=false;
    }
    if(x=="please enter valid customername") {
      document.querySelector('#billShipButtonid').disabled=true;
    }
    if(x=="Saved!") {
      document.querySelector('#billShipButtonid').disabled=false;
    }
  },
  newBillAddress:function(){
    document.querySelector('#billemail').value="";
    document.querySelector('#billaddressid').countryvalue="";
    document.querySelector('#billaddressid').statevalue="";
    document.querySelector('#billaddressid').cityname="";
    document.querySelector('#billaddressid').streetname="";
    document.querySelector('#billaddressid').pincode="";
    document.querySelector('#billmobile').value="";
  },
  saveBillAddress:function(){
    document.querySelector('check-autogenid').call();
  },
  save:function(id){
    var billjsonobj={};
    var billemail=document.querySelector('#billemail').value;
    var billcountry=document.querySelector('#billaddressid').ccode;
    var billstate=document.querySelector('#billaddressid').scode;
    var billcity=document.querySelector('#billaddressid').cityname;
    var billstreet=document.querySelector('#billaddressid').streetname;
    var billpincodeno=document.querySelector('#billaddressid').pincode;
    var billmobile=document.querySelector('#billmobile').value;
    billjsonobj.billid="bill"+id;
    billjsonobj.billsupplierid=billsupplierid;
    billjsonobj.billemail=billemail;
    billjsonobj.billcountry=billcountry;
    billjsonobj.billstate=billstate;
    billjsonobj.billcity=billcity;
    billjsonobj.billstreet=billstreet;
    billjsonobj.billpincodeno=billpincodeno;
    billjsonobj.billmobile=billmobile;
    document.querySelector('call-add-supplier-ironajax').bindBilldata(billjsonobj);
  },
});
