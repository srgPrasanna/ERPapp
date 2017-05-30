var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.supplierautocomplete=function(callback){
connection.query("SELECT UPPER(suppliername) as suppliername,supplierid FROM m_supplierdetails",function(err,rows){
    if(rows.length>0){
      // console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
