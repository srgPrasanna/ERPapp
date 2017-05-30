(function() {
  'use strict';
  Polymer({
    is: 'vehicle-in-process-driverdetails',
      vehicleprocess:function(){
        var vehiclename=this.vehiclenamevalue;
        var vehicleno=this.vehiclenovalue;
        var drivername=this.drivernamevalue;
        var drivernumber=this.drivernovalue;
        document.querySelector("vehicle-in-process-itemdetails").vehicleprocessback(vehiclename,vehicleno,drivername,drivernumber);
      },
      vehiclelabelinfo:function(e){
        var jsonlabel=this.jsondata;
        this.Vehiclename=jsonlabel[0].vehiclename;
        this.Vehicleno=jsonlabel[0].vehicleno;
        this.Drivername=jsonlabel[0].drivername;
        this.Driverno=jsonlabel[0].driverno;
      }


          });
})();
