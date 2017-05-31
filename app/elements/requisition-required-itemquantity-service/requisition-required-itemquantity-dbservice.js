exports.searchitemquantity=function(requisitionnumber,callback){
  connection.query("select item_quantity from od_procurement_requisition where requisition_number='"+requisitionnumber+"' and status='active';",function(err,quantity){
    if(quantity.length>0){
      return callback(quantity);
    }
    else {
      return callback("No quantity found!");
    }
  })
}
