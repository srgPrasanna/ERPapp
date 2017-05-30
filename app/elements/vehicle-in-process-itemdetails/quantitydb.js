var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.quantityidfetch=function(unitofmeasureidvalue,callback){
 connection.query("select unit_of_measure_name from m_unit_of_measure_detail where unit_of_measure_id='"+unitofmeasureidvalue+"'",function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
