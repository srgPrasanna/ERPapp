//call-ceo-card/call-ceo-card-todb
exports.ceosearchitem=function(callback){
  connection.query("select * from md_procurement_item_detail where item_status='Created'",function(err,rows){
  	if(rows.length>0){
      connection.query("select * from md_sales_finishedgoods_item_detail where item_status='Created'",function(err,fgrows){
        return callback(rows,fgrows);
      });
    }
    else{
      return callback("No data!");
    }
    });
}

exports.ceoresponse=function(respond,id,type,callback){
  if(type=="FG"){
  connection.query('update md_sales_finishedgoods_item_detail set item_status="'+respond+'" where item_id="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}
  else if(type!="FG"){
  connection.query('update md_procurement_item_detail set item_status="'+respond+'" where item_id="'+id+'"',function(err,rows){
    return callback("Updated");
  })
}

  else {
    return callback("Not Updated!")
  }
}

//call-requisition-approval/call-requisition-todb
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

//check-autogenid/autogen-id-todb
exports.checkgenerateId=function(callback){
    connection.query("select id from service_id_auto_generate where dummyfield='x'",function(err,retrievedData){
      if(retrievedData.length>0){
        for(var i=0;retrievedData.length>i;i++){
          retrievedData[0].id++;
        }
        connection.query("update service_id_auto_generate set id='"+retrievedData[0].id+"' where dummyfield='x'",function(err){});
        return callback(retrievedData[0].id);
      }
      else{
      console.log("Error:"+err);
      return callback("No ID Found to Generate");
      }
    });
}

//insert-update/insert-update-todb
exports.insert=function(mySQLQuery,callback){
  connection.query(mySQLQuery,function(err,status){
    if(status.affectedRows>0){
      return callback("Inserted");
    }
    else {
      console.log(err);
      return callback("Not Inserted!");
    }
  })
}

//item-details/item-details-todb
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

//item-details/map-items-todb
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

//item-details/item-to-addsupplier
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

//item-quality-testing/item-quality-testing-todb
exports.gettestingdata=function(callback){
  global.connection.query("select T1.*,T2.* from m_quality_parameter T1 JOIN od_quality_parameter T2 where T1.quality_parameter_id = T2.quality_parameter_id;",function(err,testingdata){
  if(testingdata.length>0)
    return callback(testingdata);
  else
    return callback("No testingdata!");
  });
}

exports.qtest=function(id,actualvalue,status,callback){
  var response={
    "test_id":id,
    "itemid":"",
    "actual_value":actualvalue,
    "status":status,
    "inward_register_item":"",
    "containerno":""
  }
  global.connection.query("insert into od_quality_test_result set ?",[response],function(err){
  if(!err)
    return callback("Saved");
  else{
    console.log(err);
    return callback("Not Saved!");
  }
  });
}

//requisition-process/requisition-process-todb
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

//requisition-required-itemquantity-service/requisition-required-itemquantity-dbservice
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

//requisition-stores/requisition-stores-todb
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

//warehouse-details/warehouse-details-todb
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
