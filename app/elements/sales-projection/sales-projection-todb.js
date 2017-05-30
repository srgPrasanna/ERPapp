var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var sales_person_directory='./app/elements/sales-projection/sales-projection.json';

//insert sales projection
exports.insertsales1=function(salesid,datetimeq,customerid,id,description,ispecification,rcoilsq,rtonq,rdqty,datetimeq1,status,callback){
  var response={
    "salesorderid":salesid,
    "salesorderdate":datetimeq,
    "customerid":customerid,
    "itemid":id,
    "itemdescription":description,
    "itemspecification":ispecification,
    "containerquantity":rcoilsq,
    "orderquantity":rtonq,
    "deliveredquantity":rdqty,
    "requireddeliverydate":datetimeq1,
    "status":status
  };
  jsonfile.writeFile(sales_person_directory,response,function(err){
    console.log("wrres"+JSON.stringify(response));

    if(!err){
      require('fs').readFile(sales_person_directory,'utf8',function(err,jsondata){
        dbjsondata=JSON.parse(jsondata);
        connection.query('INSERT INTO salesordercreate SET ?',[dbjsondata],function(err){
          if(!err)
          return callback("SAVED");
          else {
            console.log(err);
            console.log("not saved");
          }
        });
      });
  }
  });
}


exports.containeridfetch1=function(itemid,callback){
  connection.query("select * from m_item_container_detail where containerid in(SELECT containerid FROM m_item_details where itemid='"+itemid+"')",function(err,rows){
   if(rows.length>0){
     console.log("container"+JSON.stringify(rows));
      return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}


exports.quantityidfetch1=function(itemid,callback){
 connection.query("select * from m_item_unitofmeasure_detail where unitofmeasureid in(SELECT unitofmeasureid FROM m_item_details where itemid='"+itemid+"')",function(err,rows){
   if(rows.length>0)
   {
     console.log("unitofmeasureid"+rows);
    return callback(rows);
  }
  else{
      return callback("reject");
  }
    });
}
