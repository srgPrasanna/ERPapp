var item1;
var supplier_name="";
var supplier_id="";
var tablename;
var customerid;
var copyBillAddress;
Polymer({
  is:"call-add-customer",
  ready:function(){
    this.searchaddresshide=1;
    this.colvar=true;
  },
  checkid:function(data){
    alert(data);
  },
  clickFN:function(){
    if(this.colvar=="false"){
    this.$.suppliercollapse.toggle();
  }
  else{
  this.colvar="true";
  }
  },
  searchitemdet:function(){
    if(this.value1!=""){
    document.querySelector("#anchorID").style.display="none";
     document.querySelector('#additemid').disabled=false;
    var obj={supname:this.value1};
    document.querySelector("call-add-customer-ironajax").searchsidFN(obj);
  }
  else {
    // document.querySelector('#billShipButtonid').disabled=true;
    this.$.billShipButtonid.disabled=true;
    alert("please enter valid customer_name");
  }
  },
  additemFn:function(){
    this.colvar="false";
    this.$.suppliercollapse.toggle();
    this.page="customer-to-additem";
    document.querySelector("customer-to-additem").check();
    document.querySelector("customer-to-additem").getsupId=this.cuid;
  },
  savebuttonFn:function(){
    document.querySelector("autogen-id").send("cus");
  },
  submitFn:function(data){
    document.querySelector('#additemid').disabled=false;
    customerid=data;
    var postvalue ={
                    "sidval":data,
                    "snameval":this.value1,
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
                  this.cuid=this.value1;
          document.querySelector("call-add-customer-ironajax").to_ironajax(postvalue);
          },
          datafetchFn:function(data){
            alert(JSON.stringify(data));
            customerid=data[0].customer_id;
            this.value1=data[0].customer_id;
            this.value1=data[0].customer_name;
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
            this.cuid=this.value1;
          },
          getironpageFn:function(data){
            this.page="item-display";
            document.querySelector("item-display").getdataFn(data);
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
  getcountryjsondata:function(retrvjsondata){
    this.countryitems=retrvjsondata;
  },
  selectCountryFn:function(){
    document.querySelector("call-add-customer-ironajax").countryjsoninfo(this.selection);
  },
  getstatejsondata:function(getData){
    this.stateitems=getData;
  },
  FnSearchEnquiry1:function(e){
       if(e.keyCode==13|| e.keyCode==40)
       this.querySelector('#transportinput3').focus();
       var arr=[];
       arr.push({"itemdes1":"-----Select-----"});
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
             var subval=((item1[i].customer_name).trim()).substring(0,backsubval.length);
             if((item1[i].customer_name).toUpperCase().indexOf((this.value1).toUpperCase())!=-1)
             {
               var obj1={"itemdes1":"","enquiry_no":""};
               obj1.itemdes1=item1[i].customer_name;
               obj1.customer_id=item1[i].customer_id;
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
             var subval=((item1[i].customer_name).trim()).substring(0,this.itemval1.length);
             if((item1[i].customer_name).toUpperCase().indexOf((this.itemval1).toUpperCase())!=-1)
             {
               var obj1={"itemdes1":"","enquiry_no":""};
               obj1.itemdes1=item1[i].customer_name;
               obj1.customer_id=item1[i].customer_id;
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
       //customer_id

       FnSelectEnquiry2:function(e){
       this.querySelector('#transportinput3').style.visibility='hidden';
       supplier_name = e.target.selectedItem.textContent.trim();
       supplier_id = e.target.selectedItem.value.trim();
       this.itemArray1=[];
       document.querySelector('#transportinput3').selected=-1;
       this.value1=supplier_name;
     },
     autocompletearr:function(e)
    {
      alert(JSON.stringify(e.detail.response.returnval));
      item1=e.detail.response.returnval;
    },
    check:function(data){
      tablename=data;
    },
    addBillShipAddress:function(){
      this.page="billing";
      document.querySelector('#billcustomername').value=this.value1;
    },
    saveBillShipAddress:function(){
      document.querySelector('check-autogenid').call();
    },
    save:function(id){
      var billjsonobj={};
      var shipjsonobj={};
      var billemail=document.querySelector('#billemail').value;
      var billcountry=document.querySelector('#billaddressid').ccode;
      var billstate=document.querySelector('#billaddressid').scode;
      var billcity=document.querySelector('#billaddressid').cityname;
      var billstreet=document.querySelector('#billaddressid').streetname;
      var billpincodeno=document.querySelector('#billaddressid').pincode;
      var billmobile=document.querySelector('#billmobile').value;
      billjsonobj.billid="bill"+id;
      billjsonobj.billcustomerid=customerid;
      billjsonobj.billemail=billemail;
      billjsonobj.billcountry=billcountry;
      billjsonobj.billstate=billstate;
      billjsonobj.billcity=billcity;
      billjsonobj.billstreet=billstreet;
      billjsonobj.billpincodeno=billpincodeno;
      billjsonobj.billmobile=billmobile;
      if(this.checkvalue==true){
        copyBillAddress=1;
        shipjsonobj={shipid:"ship"+id,
                     shipname:billjsonobj.billcustomerid,
                     shipemail:billjsonobj.billemail,
                     shipcountry:billjsonobj.billcountry,
                     shipstate:billjsonobj.billstate,
                     shipcity:billjsonobj.billcity,
                     shipstreet:billjsonobj.billstreet,
                     shippincodeno:billjsonobj.billpincodeno,
                     shipmobile:billjsonobj.billmobile,
                     "copyBillAddress":copyBillAddress};
      }
      else{
        copyBillAddress=0;
        var shipname=document.querySelector('#shipcustomername').value;
        var shipemail=document.querySelector('#shipemail').value;
        var shipcountry=document.querySelector('#shipaddressid').ccode;
        var shipstate=document.querySelector('#shipaddressid').scode;
        var shipcity=document.querySelector('#shipaddressid').cityname;
        var shipstreet=document.querySelector('#shipaddressid').streetname;
        var shippincodeno=document.querySelector('#shipaddressid').pincode;
        var shipmobile=document.querySelector('#shipmobile').value;
        shipjsonobj.shipid="ship"+id;
        shipjsonobj.shipname=shipname;
        shipjsonobj.shipemail=shipemail;
        shipjsonobj.shipcountry=shipcountry;
        shipjsonobj.shipstate=shipstate;
        shipjsonobj.shipcity=shipcity;
        shipjsonobj.shipstreet=shipstreet;
        shipjsonobj.shippincodeno=shippincodeno;
        shipjsonobj.shipmobile=shipmobile;
        shipjsonobj.copyBillAddress=copyBillAddress;
      }
      document.querySelector('call-add-customer-ironajax').bindBilldata(billjsonobj);
      document.querySelector('call-add-customer-ironajax').bindShipdata(shipjsonobj);
    },
    newBillShipAddress:function(){
      document.querySelector('#billemail').value="";
      document.querySelector('#billaddressid').countryvalue="";
      document.querySelector('#billaddressid').statevalue="";
      document.querySelector('#billaddressid').cityname="";
      document.querySelector('#billaddressid').streetname="";
      document.querySelector('#billaddressid').pincode="";
      document.querySelector('#billmobile').value="";

      document.querySelector('#shipemail').value="";
      document.querySelector('#shipaddressid').countryvalue="";
      document.querySelector('#shipaddressid').statevalue="";
      document.querySelector('#shipaddressid').cityname="";
      document.querySelector('#shipaddressid').streetname="";
      document.querySelector('#shipaddressid').pincode="";
      document.querySelector('#shipmobile').value="";
    },
    fadeShip:function(){
      if(this.checkvalue==true){
        // $('#shiptag').fadeOut('slow',.6);
        $('#shiptag').fadeOut();
        // $('#shiptag').append('<div style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
      }
      else{
        // $('#shiptag').fadeIn('slow',.6);
        $('#shiptag').fadeIn();
        // $('#shiptag').append('<div style="position: absolute;top:0;left:0;width: 100%;height:100%;z-index:2;opacity:0.4;filter: alpha(opacity = 50)"></div>');
      }
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
    searchcustomerbill:function(){
      var jsonobject={};
      jsonobject.searchcustomername=this.searchcustomername;
      document.querySelector('call-add-customer-ironajax').searchdatabind(jsonobject);
    },
    allbillingaddress:function(x){
      this.searchaddresshide=0;
      this.customerallbilladdress=x;
    },
    searchcustomership:function(){
      var jsonobject={};
      jsonobject.searchshipcustomername=this.searchshipcustomername;
      document.querySelector('call-add-customer-ironajax').searchshipdata(jsonobject);
    },
    allshippingingaddress:function(x){
      this.searchaddresshide=0;
      this.customerallshipaddress=x;
    },
    // searchBillShipAddress:function(){
    //   this.page="searchbillandship";
    // }
});
