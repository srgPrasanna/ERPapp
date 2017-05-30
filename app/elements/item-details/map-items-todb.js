var mysql=require('mysql');

exports.mapitem=function(callback){
global.connection.query("SELECT item_name FROM md_procurement_item_detail",function(err,rows){
if(rows.length>0){
  global.connection.query("SELECT item_name FROM md_sales_finishedgoods_item_detail",function(err,rows1){
    for(i=0;i<rows1.length;i++){
      rows.push(rows1[i]);
    }
    return callback(rows);
  });
}

else
  return callback("Invalid!");
});
}

exports.mapsupplier=function(callback){
  global.connection.query("SELECT supplier_name FROM md_procurement_supplier_detail",function(err,rows){
  if(rows.length>0)
    return callback(rows);
  else
    return callback("Invalid!");
  });
}
