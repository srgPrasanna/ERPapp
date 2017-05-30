 (function() {
    'use strict';
  Polymer({
      is: 'driver-details',
	     ready:function(){
		     },
		   getJsondata:function(goodsvehicledrivername,goodsvehicledriverphonenumber1,goodsvehicledriverphonenumber2,goodsvehicleownername,goodsvehicleownerphonenumber)
		     {
    			  this.vehicledrivername=goodsvehicledrivername;
    				this.vehicledriverphonenumber1=goodsvehicledriverphonenumber1;
    				this.vehicledriverphonenumber2=goodsvehicledriverphonenumber2;
    				this.vehicleownername=goodsvehicleownername;
    			  this.vehicleownerphonenumber=goodsvehicleownerphonenumber;
   		   }
     });
  })();
