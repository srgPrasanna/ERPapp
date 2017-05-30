var mysql=require('mysql');

exports.searchrequisition=function(role,callback){
  connection.query('select distinct T5.*,T1.*,t6.*,t7.*,t8.* from md_procurement_item_detail as T5 JOIN od_procurement_requisition as T1 on T1.item_id=T5.item_id JOIN md_procurement_requisition_itemtype_department_mapping as T2 on T1.requisition_type_id = T2.item_type_id and T1.status="Created" JOIN md_hr_department_detail as T3 on T3.department_id=T2.requisition_reviewer_department JOIN od_hr_employee_role as T4 on T4.role=T3.department_name JOIN md_warehouse_warehouse_detail as t6 on t6.warehouse_stores_id=T5.warehouse_stores_id JOIN md_item_container_name_detail as t7 on t7.container_id=T5.container_id JOIN md_item_item_type_detail as t8 on t8.item_type_id=T5.item_type_id where T4.role="'+role+'"',function(err,requisitions){
  	if(requisitions.length>0){
      return callback(requisitions);
    }
    else{
      return callback("No data!");
    }
  });
}

exports.requisitionresponse=function(itemid,requisitionno,respond,callback){
  connection.query('update od_procurement_requisition set status="'+respond+'" where requisition_number="'+requisitionno+'"',function(err,rows){
    if(rows.affectedRows>0){
      return callback("Updated");
    }
    else{
      return callback("Not Updated!");
    }
  })
}
