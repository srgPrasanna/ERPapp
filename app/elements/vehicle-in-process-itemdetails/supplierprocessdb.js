var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.supplieridsaving=function(supplieridvalue,irnnumber,item_id,containeridvalue,unitofmeasureidvalue,remarks,containergetvalue,qtygetvalue,callback){
  var supplieridresponse={
    supplier_id:supplieridvalue,
    inward_register_number:irnnumber,
    item_id:item_id,
    container_id:containeridvalue,
    unit_of_measure_id:unitofmeasureidvalue,
    remarks:remarks,
    container_quantity:containergetvalue,
    item_quantity:qtygetvalue

  };
 connection.query("INSERT INTO od_inward_item_register SET ?",[supplieridresponse],function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
