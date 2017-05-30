var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.vehiclesaving=function(vehiclenamevalue,vehiclenovalue,drivernamevalue,drivernovalue,irnnumber,callback){
  var vehicleresponse={
    vehicle_name:vehiclenamevalue,
    vehicle_number:vehiclenovalue,
    driver_name:drivernamevalue,
    driver_number:drivernovalue,
    inward_register_number:irnnumber,

  };
 connection.query("INSERT INTO od_goods_vehicle SET ?",[vehicleresponse],function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
