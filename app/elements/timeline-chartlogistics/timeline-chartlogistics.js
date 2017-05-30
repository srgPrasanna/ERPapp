 (function() {
    'use strict';
 Polymer({
      is: 'timeline-chartlogistics',
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
          },

          confirm: function() {
            document.getElementById("myH1").style.backgroundColor = "green";
            },

          confirm1: function() {

            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();
            document.getElementById("myH2").style.backgroundColor = "green";
            document.getElementById("loadstart3").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
            document.getElementById("clk1").disabled=true;
          },

          confirm2: function() {
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();
            document.getElementById("myH3").style.backgroundColor = "green";
            document.getElementById("loadstart4").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;

          },

          confirm3: function() {
            document.getElementById("myH4").style.backgroundColor = "green";
          },

          confirm4: function() {
            document.getElementById("myH5").style.backgroundColor = "green";
          },
          loadstart:function(){
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();

            document.getElementById("loadstart1").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
           },
          loadend:function(){
            var d = new Date();
            var a=d.getDate();
            var b=d.getMonth();
            var c=d.getFullYear();
            var g=d.getHours();
            var e=d.getMinutes();
            var f=d.getSeconds();

            document.getElementById("loadstart2").innerHTML = a+"/"+b+"/"+c+" "+g+":"+e+":"+f;
          }



    });
  })();
