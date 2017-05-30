var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.fetch=function(callback){
connection.query("SELECT salesordercreate.salesorderid,salesordercreate.salesorderdate,salesordercreate.customerid,salesordercreate.itemid,salesordercreate.containerquantity,salesordercreate.orderquantity,salesordercreate.requireddeliverydate,salesordercreate.status,salesordercreate.deliveredquantity,m_customerdetail.customername FROM salesordercreate INNER JOIN m_customerdetail WHERE salesordercreate.customerid=m_customerdetail.customerid",function(err,rows){
  console.log(rows);
  if(rows.length>0){
    return callback(rows);
  }
  else{
  return callback("reject");
    }
  });
}
