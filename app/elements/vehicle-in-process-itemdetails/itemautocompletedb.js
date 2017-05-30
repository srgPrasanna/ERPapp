var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');
var arr=[];
exports.itemdescriptionautocomplete=function(suppliername,supplierid,callback){
  connection.query(" SELECT item_supplier_map.itemid ,UPPER(m_item_details.itemname) as itemname,m_item_details.containerid,m_item_details.unitofmeasures from m_item_details left join item_supplier_map on item_supplier_map.itemid=m_item_details.itemid where item_supplier_map.supplierid ='"+ supplierid +"'",function(err,rows){
 console.log(rows);
// var i=2;
// console.log(JSON.stringify(getrows));
if(rows.length>0){
  // for(var i=0;i<=getrows.length;i++){
    // console.log(JSON.stringify(getrows[i].itemid));
    // var y=getrows[i].itemid;
    // connection.query("Select UPPER(itemname) as itemname,itemid,containerid,unitofmeasures from m_item_details where itemid='"+ getrows[i].itemid +"' ",function(err,rows){
// console.log(getrows[0]);
// console.log(getrows[1]);
// console.log(getrows[2]);
// console.log(rows);
// arr.push(rows[0]);
      //  if(getrows.length==arr.length){
         return callback(rows);
       }
       else{
           return callback("reject");
       }
      });
    // }

// });
//  connection.query("select itemid from item_supplier_map where supplierid='"+supplierid+"'",function(err,rows){
//  // var dummyitemid=rows[0].itemid;
// // console.log(dummyitemid);
// if(rows.length>0){
//
// for(var i=0;i<=rows.length;i++){
//
//   connection.query("select UPPER(itemname) as itemname,itemid,containerid,unitofmeasures from m_item_details where itemid='"+rows[i]+"'",function(err,rows){
// console.log(rows);
//
//
//  });
//  }
//
//  }
//  else{
//      return callback("reject");
//  }
//  });


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
