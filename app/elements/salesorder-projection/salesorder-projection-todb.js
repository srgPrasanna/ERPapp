var express    = require('express');
var mysql      = require('mysql');
var jsonfile   = require('jsonfile');
var sales_person_directory='./app/elements/salesorder-projection/salesorder-projection.json';

//insert sales projection
exports.insertsales=function(salesid,datetimeq,customerid,id,description,ispecification,rcoilsq,rtonq,rdqty,datetimeq1,status,callback){
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
          console.log("saved");
          else {
            console.log(err);
            console.log("not saved");
          }
        });
      });
  }
  });
}

//update sales order
exports.updatesales=function(salesid,datetimeq,customerid,id,description,ispecification,rcoilsq,rtonq,rdqty,datetimeq1,status,callback){
console.log("salesid"+salesid);
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
  // jsonfile.writeFile(sales_person_directory,response,function(err){
    // if(!err){
      // require('fs').readFile(sales_person_directory,'utf8',function(jsondata){
        // dbjsondata=JSON.parse(jsondata);
        console.log("update salesordercreate set itemspecification='"+ispecification+"',status='"+status+"'  where salesorderid='"+salesid+"'");
        connection.query("update salesordercreate set itemspecification='"+ispecification+"',status='"+status+"'  where salesorderid='"+salesid+"'",[response],function(err,rows){
          console.log("update"+JSON.stringify(rows));
          if(!err)
          return callback("SAVED");
          else {
            console.log(err);
            console.log("not saved");
          }
        // });
      });
  // }
  // });
}
