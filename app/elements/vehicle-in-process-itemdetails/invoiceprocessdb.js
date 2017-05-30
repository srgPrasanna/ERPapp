var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.invoicesaving=function(invoicenovalue,invoicedatevalue,irnnumber,callback){
  var invoiceresponse={
    invoice_no:invoicenovalue,
    invoice_date:invoicedatevalue,
    inward_register_number:irnnumber
  };
    console.log(invoiceresponse);
 connection.query("INSERT INTO od_inward_item_invoice SET ?",[invoiceresponse],function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback("saved");
  }
  else{
      return callback("reject");
  }
    });
}
