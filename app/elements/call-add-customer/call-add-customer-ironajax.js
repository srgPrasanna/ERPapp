Polymer({
  is:"call-add-customer-ironajax",

  jsoninforesponse:function(){
    var arr=this.responsejson;
      document.querySelector("call-add-customer").getJsondata(arr[0].sid,arr[0].sname,arr[0].Ad_1,arr[0].Ad_2,
      arr[0].Ad_3,arr[0].country,arr[0].ste,arr[0].cty,arr[0].p_code,arr[0].m_number1,arr[0].m_number2,arr[0].e_ID,
      arr[0].stauslabl);
      },

  dbinforesponse:function(a){
    alert(a.detail.response.datavalue);
      },

  to_ironajax:function(getValue){
    this.dbpostparams=getValue;         //restrict without click sumit button
    this.$.dbpostAjax.generateRequest();
  },
  countryjsoninforesponse:function(){
  // document.querySelector("country-listbox").getjsoncountry_Fn(this.countryresponsejson);
  document.querySelector("call-add-customer").getcountryjsondata(this.countryresponsejson);
},
autocompleteFn:function(e){
  var autocompltedata=JSON.stringify(e.detail.response.datavalue);
  document.querySelector("call-add-customer").getautocompleteFn(autocompltedata);
},
countryjsoninfo:function(a){
  var statedata=this.stateresponsejson;
   var data=a;
   for(i=0;i<=statedata.length;i++){
     for(var k in statedata[i]){
        if(data==k){
          document.querySelector("call-add-customer").getstatejsondata(statedata[i][k]);
        }
      }
}
}
});
