var file=[];
var file='./app/elements/vehicle-card/datavehicle.json';

exports.vehiclesavedata=function(VehicleNoval,VehicleNameval,DriverNameval,DrivMobNumberval1,DrivMobNumberval2,OwnerNameval,OwnMobNumberval,Vehintimeval,Vehindateval,selectedstate,callback){
  var response={
  	"goodsvehiclenumber":VehicleNoval,
    "goodsvehiclename":VehicleNameval,
    "goodsvehicledrivername":DriverNameval,
    "goodsvehicledriverphonenumber":DrivMobNumberval1,
    "goodsvehicledriverphonenumber2":DrivMobNumberval2,
    "goodsvehicleownername":OwnerNameval,
    "goodsvehicleownerphonenumber":OwnMobNumberval,
    "goodsvehicleintime":Vehintimeval,
    "goodsvehicleindate":Vehindateval,
    "state":selectedstate
  };
  jsonfile.writeFile(file,response,function(err){
    if(!err)
      require('fs').readFile('./app/elements/vehicle-card/datavehicle.json','utf8',function(err,jsondata){
     dbjsondata=JSON.parse(jsondata);
     connection.query('INSERT INTO test.goodsvehiclestatustracking SET ?',[dbjsondata],function(err){});
      });

  });
}
