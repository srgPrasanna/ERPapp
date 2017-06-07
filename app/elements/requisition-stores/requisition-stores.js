var alldata=[];
Polymer({
  is: "requisition-stores",
  storesRequisitions:function(e){
      this.storesreq=e;
  },
  newbill:function(){
    document.querySelector('#bill').cityname="";
    document.querySelector('#bill').streetname="";
    document.querySelector('#bill').pincode="";

    // var x = document.getElementById('billcontainer').innerHTML;
    // document.getElementById('billcontainer').innerHTML = x;
    // this.addbilling("billing-address");
    // this.myLoadElement("billing-address");
    // this.loadvalues();
    // alldata.push({countryname:country,statename:state,city:cityname,street:streetname,state:statename});
    // alert(JSON.stringify(alldata));
  },
  // myLoadElement: function(elementName){
  //   var myElement=document.createElement(elementName);
  //   this.$.billcontainer.appendChild(myElement);
  //   myElement.myProperty = "anything";
  // },
  savebill:function(){
    // this.loadvalues();
    var country=sessionStorage.getItem("countrycode");
    var state=sessionStorage.getItem("statecode");
    var cityname=sessionStorage.getItem("city");
    var streetname=sessionStorage.getItem("street");
    var statename=sessionStorage.getItem("pincode");
    alert("billing"+country+state+cityname+streetname+statename);
    // alldata.push({countryname:country,statename:state,city:cityname,street:streetname,state:statename});
    // alert(JSON.stringify(alldata));
    // document.querySelector('address-card').cityname="";
    // document.querySelector('address-card').streetname="";
    // document.querySelector('address-card').pincode="";
    // var element = this.$.billcontainer.querySelector("*");
    // if (element) {
    //   element.parentNode.removeChild(element);
    // }
    // alldata=[];
    // alert(alldata)
    // var myElement=document.createElement("billing-address");
    // this.$.billcontainer.appendChild(myElement);
    // myElement.myProperty = "anything";
    // document.querySelector('requisition-stores').FnSetPage("billing-address");
  },
  // loadvalues:function(){
  //   country=sessionStorage.getItem("countrycode");
  //   state=sessionStorage.getItem("statecode");
  //   cityname=sessionStorage.getItem("city");
  //   streetname=sessionStorage.getItem("street");
  //   statename=sessionStorage.getItem("pincode");
  // },
  // addbilling:function(uicomponent){
  //   var element = this.$.billcontainer.querySelector("*");
  //   if (element) {
  //     element.parentNode.removeChild(element);
  //     // element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode);
  //   }
  //   var newelement=document.createElement(uicomponent);
  //   var ironpage=document.querySelector("#billcontainer");
  //   Polymer.dom(ironpage).appendChild(newelement);
  // },
  newship:function(){
    document.querySelector('#ship').cityname="";
    document.querySelector('#ship').streetname="";
    document.querySelector('#ship').pincode="";
  },
  saveship:function(){
    var country=sessionStorage.getItem("countrycode");
    var state=sessionStorage.getItem("statecode");
    var cityname=sessionStorage.getItem("city");
    var streetname=sessionStorage.getItem("street");
    var statename=sessionStorage.getItem("pincode");
    alert("shipping"+country+state+cityname+streetname+statename);
  }
});
