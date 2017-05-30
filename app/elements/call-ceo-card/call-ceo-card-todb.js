var mysql=require('mysql');

exports.searchitem=function(callback){
  connection.query("select * from md_procurement_item_detail where item_status='Created'",function(err,rows){
  	if(rows.length>0){
      connection.query("select * from md_sales_finishedgoods_item_detail where item_status='Created'",function(err,fgrows){
        return callback(rows,fgrows);
      });
    }
    else{
      return callback("No data!");
    }
    });
}

exports.ceoresponse=function(respond,id,type,callback){
  if(type=="FG"){
  connection.query('update md_sales_finishedgoods_item_detail set item_status="'+respond+'" where item_id="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}
  else if(type!="FG"){
  connection.query('update md_procurement_item_detail set item_status="'+respond+'" where item_id="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}

  else {
    return callback("Not Updated!")
  }
}
