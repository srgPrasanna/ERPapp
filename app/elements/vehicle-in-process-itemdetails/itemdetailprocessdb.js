var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.itemdetailsaving=function(item_id,containeridvalue,unitofmeasureidvalue,remarks,callback){
  var itemdetailresponse={
    item_id:item_id,
    container_id:containeridvalue,
    unit_of_measure_id:unitofmeasureidvalue,
    remarks:remarks
  };
 connection.query("INSERT INTO od_inward_item_register SET ?",[itemdetailresponse],function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
