(function() {
   'use strict';
    var arr=[];
   Polymer({
     is:"call-security-card",
      ready:function(){
      },
      testFn:function(){
        this.salesorderdata=arr;
        arr=[];
      },
      savesecurityjsonFn:function(){
        var data={
            invNum:this.invoiceNumVal,
            saleid:this.salesorderidVal,
            invDate:this.invoiceDateVal,
            delqunty:this.deliverquantityVal,
            vehouttime:this.vehicleouttimeVal
          };
        document.querySelector("call-security-card-ironajax").savesecurityFn(data);
      },
      vehNumSearchFn:function(){
        var data={searchvehiclenum:this.selection};
        document.querySelector("call-security-card-ironajax").searchidFn(data);
      },
      securityresponseFn1:function(obj){
        arr.push(obj);
      },
      getvehnoFn:function(data){
        this.vehicleNumdata=data;
      }
    });
})();
