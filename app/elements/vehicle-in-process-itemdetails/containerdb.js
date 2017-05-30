var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
exports.containeridfetch=function(containeridvalue,callback){
  connection.query("select containername from m_item_container_detail where containerid='"+containeridvalue+"'",function(err,rows){
   if(rows.length>0){
     console.log(rows);
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}


// exports.itemdescriptionautocomplete=function(suppliername,supplierid,callback){
// connection.query("SELECT suppliername,supplierid from m_supplierdetails where supplierid='"+supplierid+"'",function(err,rows){
// connection.query("select * from m_item-details where itemid in(select itemid FROM item_supplier_map where supplierid='"+supplierid+"')",function(err,rows){
    // if(rows.length>0){
//       var itemidvariable=rows[0].itemid;
// connection.query("SELECT itemname,itemid from m_item-details where itemid='"+itemidvariable+"'",function(err,rows){
      // console.log(rows);
      // return callback(rows);
//   });

  // }
  //
  // else{
  //     return callback("reject");
  // }

  //  });
// }
