var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

  var timelinefetchpath=[];
  var timelinefetchpath = "./app/elements/timeline-chartlogistics/timelinedesignlog.json";
  exports.timelinefetch=function(salesid,itemssid,callback){
    connection.query("select * from goodsvehiclestatustracking where goodsvehiclenumber in(SELECT goodsvehiclenumber FROM vehiclesalesordermapping where salesorderid='"+salesid+"')",function(err,rows){
    if(rows.length>0){
      jsonfile.writeFile(timelinefetchpath,rows,function(err){
    })
      return callback(rows);
    }
    else{
      return callback("reject");
    }
      });
  }
//update

//update sales order
// exports.updatevehicle=function(,callback){
//   var response={
//     "salesorderid":salesid,
//     "salesorderdate":datetimeq,
//     "customerid":customerid,
//     "itemid":id,
//     "itemdescription":description,
//     "itemspecification":ispecification,
//     "containerquantity":rcoilsq,
//     "orderquantity":rtonq,
//     "deliveredquantity":rdqty,
//     "requireddeliverydate":datetimeq1,
//     "status":status
//   };
//   jsonfile.writeFile(sales_person_directory,response,function(err){
//     if(!err){
//       require('fs').readFile(sales_person_directory,'utf8',function(err,jsondata){
//         dbjsondata=JSON.parse(jsondata);
//         // console.log("update salesordercreate set itemspecification='"+ispecification+"',orderquantity='"+rtonq+"',containerquantity='"+rcoilsq+"'  where salesorderid='"+salesid+"'");
//         connection.query("update salesordercreate set itemspecification='"+ispecification+"',orderquantity='"+rtonq+"',containerquantity='"+rcoilsq+"',status='"+status+"'  where salesorderid='"+salesid+"'",[dbjsondata],function(err){
//           if(!err)
//           console.log("saved");
//           else {
//             console.log(err);
//             console.log("not saved");
//           }
//         });
//       });
//   }
//   });
// }
