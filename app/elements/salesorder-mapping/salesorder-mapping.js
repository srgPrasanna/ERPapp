Polymer({
  is:"salesorder-mapping",
      ready:function(){
        alert("salesorder-mapping");
      },
      getsalesorderFn:function(data,vehno,salid){
        document.querySelector("salesorder-mapping").getvehicleno=vehno;
        this.saleorderdata=data;
      },
      salesappendFn:function(data){
            saleidarr=data;
      },
      saveselectesalesidFn:function(){
         var maparr=[];
         for(var i=0;i<saleidarr.length;i++)
         {
           var obj={vehno:this.getvehicleno,
                     salid:saleidarr[i]};
                     maparr.push(obj);
          }
        document.querySelector("salesorder-mapping-ironajax").getsavebtnFn(maparr);
      },
      backto_vehsummary:function(){
        document.querySelector("home-page").FnSetPage("vehicleorder-summary");
      }
});
