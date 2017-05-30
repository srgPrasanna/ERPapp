var express    = require("express");
var mysql      = require('mysql');

var jsonfile=require('jsonfile');
var itemfetchpath=[];
var itemfetchpath = "./app/elements/item-customerdetail/itemdesign.json";
exports.itemfetch=function(itemssid,callback){
  connection.query("select * from m_item_details where itemid='"+itemssid+"'",function(err,rows){
  if(rows.length>0){
      jsonfile.writeFile(itemfetchpath,rows,function(err){
  })
  console.log(rows);
      return callback(rows);
}
else{
    return callback("reject");
}
});
}
