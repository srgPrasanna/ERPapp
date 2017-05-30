var mysql=require('mysql');

exports.getstoresrequisitions=function(callback){
    connection.query("select t1.*,t2.*,t3.*,t4.*,t5.*,t6.*,t7.* from od_procurement_requisition as t1 join md_procurement_item_detail as t2 on t1.item_id=t2.item_id join md_item_container_name_detail as t3 on t2.container_id=t3.container_id join md_item_unit_of_measure_detail as t4 on t2.unit_of_measure_id = t4.unit_of_measure_id join md_item_item_type_detail as t5 on t2.item_type_id=t5.item_type_id join md_warehouse_warehouse_detail as t6 on t2.warehouse_stores_id = t6.warehouse_stores_id join od_item_inventory as t7 on t7.item_id=t1.item_id where status='active';",function(err,requisitionstoresdata){
      if(requisitionstoresdata.length>0){
        return callback(requisitionstoresdata);
      }
      else{
        console.log(err);
        return callback("No Data!");
      }
    });
}

exports.supplyitem=function(autoid,reqno,containerquantity,supplyquantity,datetime,status,callback){
  var response={"item_movement_id":autoid,
                "requisition_number":reqno,
                "container_quantity":containerquantity,
                "item_movement_quantity":supplyquantity,
                "item_movement_date_time":datetime,
                "status":status
              };
    connection.query("insert into od_stores_item_movement set ?",[response],function(err,requisitionsupply){
      if(requisitionsupply.affectedRows>0){
        connection.query('update od_procurement_requisition set status="'+status+'" where requisition_number="'+reqno+'"',function(err){
          return callback("Item Supplied");
        })
      }
      else{
        console.log(err);
        return callback("Item Not Supplied!");
      }
    });
}