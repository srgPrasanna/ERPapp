var mysql=require('mysql');

exports.requisitionsearchitem=function(role,callback){
  connection.query("select distinct T1.item_name from md_procurement_item_detail as T1 JOIN md_procurement_requisition_itemtype_department_mapping as T2 on T1.item_type_id = T2.item_type_id and T1.item_status='active' JOIN md_hr_department_detail as T3 on T3.department_id=T2.requisition_reviewer_department JOIN od_hr_employee_role as T4 on T4.role=T3.department_name where T4.role='"+role+"';",function(err,itemnames){
    if(itemnames.length>0){
      return callback(itemnames);
    }
    else {
      return callback("No items found!");
    }
  })
}

exports.getrequisitionitem=function(itemname,callback){
  connection.query("select t1.*,t2.*,t3.*,t4.*,t5.* from md_procurement_item_detail as t1 join md_item_item_type_detail as t2 on t1.item_type_id=t2.item_type_id join md_item_container_name_detail as t3 on t1.container_id=t3.container_id join md_warehouse_warehouse_detail as t4 on t1.warehouse_stores_id = t4.warehouse_stores_id join md_item_unit_of_measure_detail as t5 on t5.unit_of_measure_id=t1.unit_of_measure_id where t1.item_name='"+itemname+"';",function(err,itemdetails){
    if(itemdetails.length>0){
      return callback(itemdetails);
    }
    else {
      return callback("No Data!");
    }
  })
}

exports.getwarehouselocation=function(itemname,callback){
  var id;
    connection.query("select item_id from md_procurement_item_detail where item_name='"+itemname+"'",function(err,itemid){
      if(itemid.length>0){
        global.id=itemid[0].itemid;
        connection.query("select * from md_procurement_item_detail where item_id='"+global.id+"'",function(err,warehouselocation){
          return callback(warehouselocation);
        })
      }
      else{
        connection.query("select item_id from md_sales_finishedgoods_item_detail where item_name='"+itemname+"'",function(err,itemid){
          global.id=itemid[0].itemid;
          connection.query("select * from md_sales_finishedgoods_item_detail where item_id='"+global.id+"'",function(err,warehouselocation){
            return callback(warehouselocation);
          })
        })
      }
    });
}

exports.saverequisition=function(requisitionid,iid,selectedtype,itemspec1,whlocation,selectedcontainer,itemquantity,requisitiondate,requireddate,callback){
  var data={
    "requisition_number":requisitionid,
    "requisition_date":requisitiondate,
    "requisition_type_id":selectedtype,
    "item_id":iid,
    "item_quantity":itemquantity,
    "warehouse_stores_id":whlocation,
    "status":"Created",
    "item_required_date":requireddate
  }
  connection.query("insert into od_procurement_requisition set ?",[data],function(err,rows){
    if(rows.affectedRows>0){
      return callback("Saved");
    }
    else {
      return callback("Not Saved!");
    }
  })
}
