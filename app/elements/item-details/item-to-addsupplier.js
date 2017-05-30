var mysql=require('mysql');

exports.fixSupplier=function(itemname,suppliername,pricing,date,callback){
var x;
var y;
global.connection.query("select item_id from md_procurement_item_detail where item_name='"+itemname+"'",function(err,itemid){
  global.x=itemid;
  global.connection.query("select supplier_id from md_procurement_supplier_detail where supplier_name='"+suppliername+"'",function(err,supplierid){
    global.y=supplierid;
    var z=[{"item_id":global.x[0].item_id,"supplier_id":global.y[0].supplier_id,"pricing":pricing,"effective_date":date}];
    global.connection.query("insert into od_procurement_item_supplier_mapping set ?",z,function(err){
      if(!err){
        return callback("Supplier Added");
      }
      else {
        return callback("Failed to add!");
      }
    });
  });
});
}
