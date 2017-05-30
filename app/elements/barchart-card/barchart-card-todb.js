var express    = require("express");
var mysql      = require('mysql');
var jsonfile=require('jsonfile');

var barcharttablefetchpath=[];
var barcharttablefetchpath = "./app/elements/barchart-card/barchart.json";
  exports.barcharttablefetch=function(callback){
var itemid = sessionStorage.getItem('itemid');
  connection.query("SELECT salesordercreate.orderquantity, salesordercreate.deliverquantity, materialinventory.itemavailablequantity from materialinventory inner join salesordercreate WHERE materialinventory.itemid & salesordercreate.itemid='"+ itemid +"' ",function(err,rows){
    if(rows.length>0){
        jsonfile.writeFile(barcharttablefetchpath,rows,function(err){
      })
  }
    else{
      res.status(200).json({'returnval': "Data not found!"});
  }
});
}
