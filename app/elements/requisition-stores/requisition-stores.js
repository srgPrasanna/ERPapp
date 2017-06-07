Polymer({
  is: "requisition-stores",
  storesRequisitions:function(e){
      this.storesreq=e;
  },
  newbill:function(){
    document.querySelector('#bill').cityname="";
    document.querySelector('#bill').streetname="";
    document.querySelector('#bill').pincode="";
  },
  savebill:function(){
    var country=document.querySelector('#bill').ccode;
    var state=document.querySelector('#bill').scode;
    var city=document.querySelector('#bill').cityname;
    var street=document.querySelector('#bill').streetname;
    var pincodeno=document.querySelector('#bill').pincode;
    alert("bill"+country+state+city+street+pincodeno);
  },
  newship:function(){
    document.querySelector('#ship').cityname="";
    document.querySelector('#ship').streetname="";
    document.querySelector('#ship').pincode="";
  },
  saveship:function(){
    var country=document.querySelector('#ship').ccode;
    var state=document.querySelector('#ship').scode;
    var city=document.querySelector('#ship').cityname;
    var street=document.querySelector('#ship').streetname;
    var pincodeno=document.querySelector('#ship').pincode;
    alert("ship"+country+state+city+street+pincodeno);
  }
});
