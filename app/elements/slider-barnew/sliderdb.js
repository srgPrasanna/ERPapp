var express    = require("express");
var mysql      = require('mysql');
var file='app/config/data.json';
var jsonfile=require('jsonfile');

exports.sliderchange=function(itemssid,callback){
  connection.query("SELECT salesordercreate.orderquantity, materialinventory.itemavailablequantity FROM salesordercreate INNER JOIN materialinventory ON salesordercreate.itemid=materialinventory.itemid  where salesordercreate.itemid='"+ itemssid +"' ",function(err,rows){
    if(rows.length>0){
      console.log(rows);
     return callback(rows);
    }
     else{
     return callback("reject");
    }
});
}
