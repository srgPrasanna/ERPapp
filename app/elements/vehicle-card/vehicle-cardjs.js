Polymer({
  is:"vehicle-card",

  submitFn:function(){
        var jsonobject={};
        jsonobject.VehicleNoval=this.VehicleNoval,
        jsonobject.VehicleNameval=this.VehicleNameval,
        jsonobject.DriverNameval=this.DriverNameval,
        jsonobject.DrivMobNumberval1=this.DrivMobNumberval1,
        jsonobject.DrivMobNumberval2=this.DrivMobNumberval2,
        jsonobject.OwnerNameval=this.OwnerNameval,
        jsonobject.OwnMobNumberval=this.OwnMobNumberval,
        jsonobject.Vehintimeval=this.Vehintimeval,
        jsonobject.Vehindateval=this.Vehindateval,
        jsonobject.selectedstate=this.selectedstate
        document.querySelector("vehiclecard-ironajax").to_ironajax(jsonobject);
            },

    getJsondata:function(vno,vname,dname,dno1,dno2,ownname,ownno,vintime,vindate,typelab,sin,sout){
      this.VehicleNo=vno;
      this.VehicleName=vname;
      this.DriverName=dname;
      this.DrivMobNumber1=dno1;
      this.DrivMobNumber2=dno2;
      this.OwnerName=ownname;
      this.OwnMobNumber=ownno;
      this.Vehintime=vintime;
      this.Vehindate=vindate;
      this.typelabel=typelab;
      this.s1value=sin;
      this.s2value=sout;

    }
});
