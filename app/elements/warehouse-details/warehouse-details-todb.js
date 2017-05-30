var mysql=require('mysql');

exports.getwarehousedetails=function(callback){
    connection.query("select * from md_warehouse_warehouse_detail",function(err,whdata){
      if(whdata.length>0){
        return callback(whdata);
      }
      else{
        console.log(err);
        return callback("Error!");
      }
    });
}
