var mysql=require('mysql');

exports.getInventoryDetails=function(inventory_itemid,callback){
    connection.query('SELECT  sum(item_available_quantity) as avail_item_qty from od_item_inventory where item_id= "'+inventory_itemid+'"',function(err,itdata){
      if(itdata.length>0){
        return callback(itdata);
      }
      else{
        console.log(err);
        return callback("Error!");
      }
    });
}
