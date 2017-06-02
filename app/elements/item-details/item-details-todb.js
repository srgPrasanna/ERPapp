var mysql=require('mysql');

exports.insertitems=function(sid,id,name,description,specification1,specification2,container,unit,group,type,itemstatus,ptype,whlocation,callback){
  var response={"item_id":id,
                "item_name":name,
                "item_description":description,
                "item_specification1":specification1,
                "item_specification2":specification2,
                "container_id":container,
                "unit_of_measure_id":unit,
                "item_group":group,
                "item_type_id":type,
                "item_status":itemstatus,
                "item_purchase_type":ptype,
                "warehouse_stores_id":whlocation
                };
  if(type=="FG"){
   connection.query('INSERT INTO md_sales_finishedgoods_item_detail SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
 else{
   connection.query('INSERT INTO md_procurement_item_detail SET ?',[response],function(err){
     if(!err)
       return callback("saved!");
     else{
       console.log(err);
       return callback("Not Saved");
     }
   });
 }
}

exports.itemdetailssearchitem=function(name,callback){
    connection.query("select * from md_procurement_item_detail where item_name='"+name+"'",function(err,rows){
      if(rows.length>0){
        connection.query("select * from md_procurement_supplier_detail left join od_procurement_item_supplier_mapping on od_procurement_item_supplier_mapping.supplier_id=md_procurement_supplier_detail.supplier_id left join md_procurement_item_detail on md_procurement_item_detail.item_id=od_procurement_item_supplier_mapping.item_id where md_procurement_item_detail.item_name='"+name+"'",function(err,suppliers){
          return callback(rows,suppliers);
        });
      }
      else{
        connection.query("select * from md_sales_finishedgoods_item_detail where item_name='"+name+"'",function(err,rows1){
          connection.query("select * from md_procurement_supplier_detail left join od_procurement_item_supplier_mapping on od_procurement_item_supplier_mapping.supplier_id=md_procurement_supplier_detail.supplier_id left join md_procurement_item_detail on md_procurement_item_detail.item_id=od_procurement_item_supplier_mapping.item_id where md_procurement_item_detail.item_name='"+name+"'",function(err,suppliers){
            return callback(rows1,suppliers);
          });
        })
      }
    });
}

exports.searchitemContainer=function(callback){
  connection.query('select * from md_item_container_name_detail;',function(err,data){
    if(data.length>0){
      return callback(data);
    }
    else{
      return callback("No data!");
    }
  })
}

exports.searchitemType=function(callback){
  connection.query('select * from md_item_item_type_detail;',function(err,data){
    if(data.length>0){
      return callback(data);
    }
    else{
      return callback("No data!");
    }
  })
}

exports.searchitemUnit=function(callback){
  connection.query('select * from md_item_unit_of_measure_detail;',function(err,data){
    if(data.length>0){
      return callback(data);
    }
    else{
      return callback("No data!");
    }
  })
}
