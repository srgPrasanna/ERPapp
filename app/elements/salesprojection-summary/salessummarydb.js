var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

exports.fetch1=function(callback){
connection.query("SELECT distinct salesordercreate.salesorderid,salesordercreate.salesorderdate,salesordercreate.customerid,salesordercreate.itemid,salesordercreate.containerquantity,salesordercreate.orderquantity,salesordercreate.requireddeliverydate,salesordercreate.status,salesordercreate.deliveredquantity,m_customerdetail.customername,m_customerdetail.city,finishedgoods_itemtype.itemname FROM salesordercreate JOIN m_customerdetail ON (salesordercreate.customerid=m_customerdetail.customerid) left JOIN finishedgoods_itemtype ON (finishedgoods_itemtype.itemid = salesordercreate.itemid) where salesordercreate.status = 'Projection'",function(err,rows){
  console.log(rows);
  if(rows.length>0){
    return callback(rows);
  }
  else{
  return callback("reject");
    }
  });
}

exports.salespro=function(salesorderid,callback){
connection.query("SELECT distinct m_customerdetail.customername,finishedgoods_itemtype.itemname,m_customerdetail.city,salesordercreate.orderquantity,salesordercreate.containerquantity,salesordercreate.requireddeliverydate FROM salesordercreate JOIN m_customerdetail ON (salesordercreate.customerid=m_customerdetail.customerid) left JOIN finishedgoods_itemtype ON (finishedgoods_itemtype.itemid = salesordercreate.itemid) where salesordercreate.salesorderid='"+salesorderid+"'",function(err,rows){
  console.log("sales"+JSON.stringify(rows));
  if(rows.length>0){
    return callback(rows);
  }
  else{
  return callback("reject");
    }
  });
}
