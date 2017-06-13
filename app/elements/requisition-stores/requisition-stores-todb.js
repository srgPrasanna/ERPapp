var mysql=require('mysql');

exports.getstoresrequisitions=function(callback){
    connection.query("select t1.*,t2.*,t3.*,t4.*,t5.*,t6.*,t7.* from od_procurement_requisition as t1 left join md_procurement_item_detail as t2 on t1.item_id=t2.item_id left join md_item_container_name_detail as t3 on t3.container_id=t2.container_id left join md_item_unit_of_measure_detail as t4 on t4.unit_of_measure_id = t2.unit_of_measure_id left join md_item_item_type_detail as t5 on t5.item_type_id=t2.item_type_id left join md_warehouse_warehouse_detail as t6 on t6.warehouse_stores_id = t2.warehouse_stores_id left join od_item_inventory as t7 on t1.item_id=t7.item_id where t1.status='active';",function(err,requisitionstoresdata){
      if(requisitionstoresdata.length>0){
        return callback(requisitionstoresdata);
      }
      else{
        console.log(err);
        return callback("No Data!");
      }
    });
}

exports.supplyitem=function(autoid,reqno,containerquantity,supplyquantity,datetime,status,itemid,callback){
  var response={"item_movement_id":autoid,
                "requisition_number":reqno,
                "container_quantity":containerquantity,
                "item_movement_quantity":supplyquantity,
                "item_movement_date_time":datetime,
                "status":status
              };
    connection.query("insert into od_stores_item_movement set ?",[response],function(err,requisitionsupply){
      if(requisitionsupply.affectedRows>0){
        connection.query('update od_procurement_requisition set status="'+status+'" where requisition_number="'+reqno+'"',function(err,detail){
          if(detail.affectedRows>0){
            connection.query('UPDATE od_item_inventory SET item_available_quantity = item_available_quantity - "'+supplyquantity+'" where item_id="'+itemid+'";',function(err,status){
              if(status.affectedRows>0){
                return callback("Item Supplied");
              }
              else{
                console.log(err);
                return callback("Item supplied, Supplied Status updated but failed update available quantity!");
              }
            });
          }
          else{
            console.log(err);
            return callback("Item Supplied but failed to update supplied status!");
          }
        })
      }
      else{
        console.log(err);
        return callback("Item Not Supplied!");
      }
    });
}
