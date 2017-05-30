 (function() {
    'use strict';
 Polymer({
      is: 'timeline-chart',
//       mouseover:function(e){
//         // document.addEventListener('mouseover', function (e) {
//         var time = document.getElementById('timeline-badge');
//         time.time = "active";
//         false;
//
// },

    	    getJsondata:function(goodsvehiclenumber,goodsvehicleintime,loadstart,loadend,goodsvehicleouttime,delivered){
    			  	this.vehicleno=goodsvehiclenumber;
          	  this.vehicleintime=goodsvehicleintime;
              this.vehicleloadstartdatetime=loadstart;
              this.vehicleloadenddatetime=loadend;
              this.vehicleouttime=goodsvehicleouttime;
              this.deliveredtime=delivered;
          },
          Jsondata:function(vehicleintime,vehicleloadstartdatetime,vehicleloadenddatetime,vehicleouttime,vehicledelivered){
              this.vehicleintimelabel=vehicleintime;
              this.vehicleloadstartdatetimelabel=vehicleloadstartdatetime;
              this.vehicleloadenddatetimelabel=vehicleloadenddatetime;
              this.vehicleouttimelabel=vehicleouttime;
              this.deliveredtimelabel=vehicledelivered;
          }
    });
  })();
