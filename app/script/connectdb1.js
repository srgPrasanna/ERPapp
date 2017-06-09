var express    = require("express");
var mysql      = require('mysql');

var jsonfile=require('jsonfile');
var file='/node/workshop template/app/config/data.json';

var dbjson=[];
exports.getconnection=function(){
  require('fs').readFile('/node/workshop template/app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    exports.connectionvalues();
  });
}

// var connection;
// exports.connectionvalues=function(){
//   connection=mysql.createConnection({
//     host:dbjson[0].host,
//     port:dbjson[0].port,
//     user:dbjson[0].user,
//     password:dbjson[0].password,
//     database:dbjson[0].database
//   });
//   connection.connect(function(err){
//     if(!err){
//       console.log("Connected with database");
//     }
//     else {
//       console.log("Failed to connect with database!");
//     }
//   });
// }


exports.login=function(eid,epass,callback){
  	connection.query("SELECT * FROM emp_login where emp_id='"+eid+"' and password='"+epass+"'",function(err,rows){
  	if(rows.length>0){

      var roleid=rows[0].role_id;
      connection.query("select * from emp_login_menu where menu_id in(SELECT menu_id FROM menu_map where role_id='"+roleid+"')",function(err,rows){

        return callback(rows);

      });
      }
    else{

      return callback("reject");

    }
    });
}
exports.loopsecuritysearchFn=function(searchval,callback){
  callback=callback||function(){};
  // console.log("searchval"+searchval);
  	connection.query("SELECT * FROM salesordercreate where salesorderid='"+searchval+"'",function(err,rows){
  	if(rows.length>0){
      // console.log("loopsecuritysearchFn"+rows);
      return callback(rows);
    }
    // else{
    //   // console.log(err);
    //   return callback("reject");
    // }
    });
}
exports.securitysearchFn=function(searchval,callback){
  callback=callback||function(){};
  	connection.query("SELECT * FROM vehiclesalesordermapping where goodsvehiclenumber='"+searchval+"'",function(err,rows){
  	if(rows.length>0){
        return callback(rows);
      }
    else{
      // console.log(err);
      return callback("reject");
    }
    });
}
exports.autosecuritysearchFn=function(callback){
  callback=callback||function(){};
  	connection.query("SELECT * FROM goodsvehiclestatustracking",function(err,rows){
  	if(rows.length>0){
      return callback(rows);
    }
    else{
      // console.log(err);
      return callback("reject");
    }
    });
}
exports.insertsales=function(datetimeq,rcoilsq,rtonq,status,datetimeq1,callback){
  var response={
    "salesorderdate":datetimeq,
    "containerquantity":rcoilsq,
    "orderquantity":rtonq,
    "status":status,
    "requireddeliverydate":datetimeq1
  };
  jsonfile.writeFile(file,response,function(err){
    if(!err)
    exports.writetodb();
  });
}
exports.securityjsonsaveFn=function(ino,sid,idate,delqty,vehtime,callback){
  var response={
    "InvoiceNumber":ino,
    "SalesorderId":sid,
    "InvoinceDate":idate,
    "DeliverQuantity":delqty,
    "VehicleOutTime":vehtime
  };
  jsonfile.writeFile(file,response,function(err){
    if(!err)
    return callback("json writed");
  });
  exports.securityjsontodb();
}
var securitydbjsondata=[];
exports.securityjsontodb=function(){
  // console.log("securityjsontodb");
  require('fs').readFile('/node/workshop template/app/config/data.json','utf8',function(err,jsondata){
    securitydbjsondata=JSON.parse(jsondata);
    // console.log(securitydbjsondata);
    exports.securityjsontodb_Fn(securitydbjsondata);
  });
}
var dbjsondata=[];
exports.writetodb=function(){
  require('fs').readFile('/node/workshop template/app/config/data.json','utf8',function(err,jsondata){
    dbjsondata=JSON.parse(jsondata);
    // console.log(dbjsondata);
    exports.jsontodb(dbjsondata);
  });
}
exports.jsontodb=function(dbjsondata){
  // console.log(dbjsondata);
  var jresponse={
    "salesorderdate":dbjsondata.salesorderdate,
    "containerquantity":dbjsondata.containerquantity,
    "orderquantity":dbjsondata.orderquantity,
    "status":dbjsondata.status,
    "requireddeliverydate":dbjsondata.requireddeliverydate
  };
  // console.log("jres:"+JSON.stringify(jresponse));
  connection.query('INSERT INTO salesordercreate SET ?',[jresponse],function(err){

    if(!err)
    console.log("saved");
    else {
      console.log("not saved");
    }
  });
}
exports.securityjsontodb_Fn=function(dbjsondata){
  //  console.log(dbjsondata);
  var jresponse={
    "invoicenumber":dbjsondata.InvoiceNumber,
    "salesorderid":dbjsondata.SalesorderId,
    "invoicedate":dbjsondata.InvoinceDate,
    "deliveredquantity":dbjsondata.DeliverQuantity,
    "vehicleouttime":dbjsondata.VehicleOutTime
  };
  console.log("jres:"+JSON.stringify(jresponse));
  connection.query('INSERT INTO invoice_details SET ?',[jresponse],function(err){
    if(!err)
    console.log("saved");
    else {
      console.log("not saved");
    }
  });
}

exports.ceocustomeapprovalFn=function(data,callback){
  connection.query("update m_customerdetail SET status='"+data.status+"' where customerid='"+data.customerid+"'",function(err,result){
  if(result.affectedRows>0){
      // jsonfile.writeFile(vehiclefetchpath,rows,function(err){
      // console.log("vehiclefetchpath"+err);
    // });
    return callback("updated");
  }
else{
    return callback("not updated");
  }
});
}

exports.ceocustomerajaxFn=function(callback){
  connection.query('Select * FROM m_customerdetail where status="created"',function(err,rows){
  if(rows.length>0){
    // console.log(rows);
      jsonfile.writeFile("app/elements/ceo-customer-card/ceo-customer-card.json",rows,function(err){
        if(!err){
      console.log("vehicle.json created");
      return callback(rows);
      }
    else {
      console.log("ceo-customer-card.json not created"+err);
      // return callback("ceo-customer-card.json not created");
    }
    });
  }
else{
    return callback("reject");
  }
});
}
// var vehiclefetchpath=[];
// var vehiclefetchpath = "‪app/elements/vehicleorder-summary/vehicle.json";
exports.vehiclefetch=function(callback){
  connection.query('Select * FROM goodsvehiclestatustracking',function(err,rows){
  if(rows.length>0){
    // console.log(rows);
      jsonfile.writeFile("app/elements/vehicleorder-summary/vehicle.json",rows,function(err){
        if(!err){
      // console.log("vehicle.json created");
    }
    else {
      console.log("vehicle.json not created"+err);
    }
    });
  }
else{
    return callback("reject");
  }
});
}
// mapping to salesorder-summary.json
exports.searchsalesorderconncetdbFn=function(callback){
  connection.query('Select * FROM salesordercreate',function(err,rows){
  if(rows.length>0){
      // jsonfile.writeFile(vehiclefetchpath,rows,function(err){
      // console.log("vehiclefetchpath"+err);
    // });
    return callback(rows);
  }
else{
    return callback("reject");
  }
});
}
exports.savesalesorderconncetdbFn=function(data,callback){
  console.log("mapping row"+data);
connection.query('insert into vehiclesalesordermapping SET ?',[data],function(err,result){
if(!err)
  // res.status(200).json({'returnval': "data saved"});
  return callback("saved");
else{
  console.log("savesale"+err);
  // res.status(200).json({'returnval': "Data not saved!"});
  return callback("not saved");
}
});
}

exports.supplieritempostFn=function(data,callback){
connection.query("INSERT INTO item_supplier_map SET ?",[data],function(err,result){
  if(!err){
    return callback("saved");
  }
  else{
    console.log(err);
    return callback("not saved");
  }
  });
}
exports.customeritempostFn=function(data,callback){
connection.query("INSERT INTO item_customer_map SET ?",[data],function(err,result){
  if(!err){
    return callback("saved");
  }
  else{
    console.log(err);
    return callback("not saved");
  }
  });
}
exports.supplieritem_mapFn=function(callback){
connection.query(" SELECT * FROM m_item_details WHERE itemstatus = 'active'",function(err,rows){
  if(!err){
    // console.log("got it");
    return callback(rows);
  }
  else{
    console.log(err);
    return callback("didn't get it");
  }
  });
}

exports.customeritem_mapFn=function(callback){
connection.query(" SELECT * FROM finishedgoods_itemtype WHERE itemstatus = 'active'",function(err,rows){
  if(!err){
    return callback(rows);
  }
  else{
    console.log(err);
    return callback("didn't get it");
  }
  });
}

exports.savesupplierdetFn=function(data,callback){
  // console.log(data);
connection.query(" INSERT INTO m_supplierdetails SET ?",[data],function(result,err){
  if(!err){
    console.log("saved");
    return callback("saved");
  }
  else{
    console.log(err);
    return callback("not saved");
  }
  });
}

exports.searchsupplieridFn=function(data,callback){
  var query="SELECT m_item_details.itemid,m_item_details.itemname,m_item_details.itemdescription,m_item_details.itemspecification1,m_item_details.itemspecification2,m_item_details.containerid,m_item_details.unitofmeasures,m_item_details.itemgroup,m_item_details.itemtypeid,m_item_details.itemstatus,m_item_details.itempurchasetype,m_item_details.status,m_supplierdetails.supplierid,m_supplierdetails.suppliername,m_supplierdetails.address1,m_supplierdetails.address2,m_supplierdetails.address3,m_supplierdetails.city,m_supplierdetails.state,m_supplierdetails.country,m_supplierdetails.pincode,m_supplierdetails.mobile1,m_supplierdetails.mobile2,m_supplierdetails.email,m_supplierdetails.status FROM   m_item_details left JOIN item_supplier_map ON item_supplier_map.itemid = m_item_details.itemid left JOIN m_supplierdetails ON m_supplierdetails.supplierid = item_supplier_map.supplierid where m_supplierdetails.suppliername='"+data.supname+"'";
connection.query(query,function(err,rows){
  if(rows.length>0){
      return callback(rows);
    }
  else{
    connection.query("select * from m_supplierdetails where suppliername='"+data.supname+"'",function(err,rows){
    return callback(rows);
  });
  }
  return callback("not get");
});
}
exports.generateIdFn=function(callback){
    connection.query("select id from autogenerateid",function(err,retrievedData){
      if(retrievedData.length>0){
        for(var i=0;retrievedData.length>i;i++){
          retrievedData[0].id++;
        }
        connection.query("insert into autogenerateid (id) values ('"+retrievedData[0].id+"')",function(err){});
        return callback(retrievedData[0].id);
      }
      else{
      console.log("Error:"+err);
      return callback("No ID Found to Generate");
      }
    });
}
exports.searchcustomeridFn=function(data,callback){
  var query="SELECT m_customerdetail.customerid,m_customerdetail.customername,m_customerdetail.address1,m_customerdetail.address2,m_customerdetail.address3,m_customerdetail.city,m_customerdetail.state,m_customerdetail.country,m_customerdetail.pincode,m_customerdetail.mobile1,m_customerdetail.mobile2,m_customerdetail.email,m_customerdetail.status,finishedgoods_itemtype.itemid,finishedgoods_itemtype.itemname,finishedgoods_itemtype.itemdescription,finishedgoods_itemtype.itemspecification1,finishedgoods_itemtype.itemspecification2,finishedgoods_itemtype.containerid,finishedgoods_itemtype.unitofmeasures,finishedgoods_itemtype.itemgroup,finishedgoods_itemtype.itemtypeid,finishedgoods_itemtype.itemstatus,finishedgoods_itemtype.itempurchasetype,finishedgoods_itemtype.status FROM m_customerdetail LEFT JOIN finishedgoods_itemtype ON  finishedgoods_itemtype.itemid  LEFT JOIN  item_customer_map ON item_customer_map.customerid=m_customerdetail.customerid  WHERE m_customerdetail.customername ='"+data.supname+"'";
connection.query(query,function(err,rows){
  if(rows.length>0){
      return callback(rows);
    }
  else{
    connection.query("select * from m_customerdetail where customername='"+data.supname+"'",function(err,rows){
    return callback(rows);
  });
  }
return callback("not get");
});
}
// exports.getsupplierdataFn=function(callback){
// connection.query(" select * from m_supplierdetails ",function(err,rows){
//   if(!err){
//     return callback(rows);
//   }
//   else{
//     console.log(err);
//     return callback("not get");
//   }
//   });
// }

exports.savecustomertdetFn=function(data,callback){
  console.log(data);
connection.query(" INSERT INTO m_customerdetail SET ?",[data],function(result,err){
  if(!err){
    console.log("saved");
    return callback("saved");
  }
  else{
    console.log(err);
    return callback("saved");
  }
  });
}

exports.storeFn=function(callback){
  callback=callback||function(){};
  	connection.query("SELECT item_id,supplier_id,inward_register_number FROM od_inward_item_register where status='stores'",function(err,getrows){
        var arr=[];
  	if(getrows.length>0){
      for(var i=0;i<getrows.length;i++){
          connection.query("SELECT T1.itemname,T1.itemspecification1,T2.suppliername,T3.*,T4.item_quantity,T4.container_quantity,T4.unit_of_measure_id,T4.container_id,T4.status,T4.po_number,T4.po_date FROM m_item_details T1 JOIN m_supplierdetails T2 ON T1.itemid = '"+getrows[i].item_id+"' AND T2.supplierid = '"+getrows[i].supplier_id+"' JOIN od_inward_item_invoice T3 ON inward_register_number='"+getrows[i].inward_register_number+"' JOIN od_inward_item_register T4 ON T4.item_id='"+getrows[i].item_id+"'",function(err,rows){
            arr.push(rows[0]);
            if(getrows.length==arr.length){
              return callback(arr);
            }
        });
      }
    }
  });
}

exports.purchaseFn=function(callback){
  callback=callback||function(){};
  connection.query("SELECT item_id,supplier_id,inward_register_number FROM od_inward_item_register where status='purchase'",function(err,getrows){
      var arr=[];
  if(getrows.length>0){
    for(var i=0;i<getrows.length;i++){
        connection.query("SELECT T1.itemname,T1.itemspecification1,T2.suppliername,T3.*,T4.item_quantity,T4.container_quantity,T4.unit_of_measure_id,T4.container_id,T4.status,T4.po_date,T4.po_number FROM m_item_details T1 JOIN m_supplierdetails T2 ON T1.itemid = '"+getrows[i].item_id+"' AND T2.supplierid = '"+getrows[i].supplier_id+"' JOIN od_inward_item_invoice T3 ON inward_register_number='"+getrows[i].inward_register_number+"' JOIN od_inward_item_register T4 ON T4.item_id='"+getrows[i].item_id+"'",function(err,rows){
          arr.push(rows[0]);
          if(getrows.length==arr.length){
            return callback(arr);
          }
      });
    }
  }
});
}
  exports.savecontaineridFn=function(data,callback){
  connection.query("INSERT INTO grncontainerdetail SET ?",[data],function(err,result){
    if(!err){
      return callback("saved");
    }
    else{
      console.log(err);
      return callback("not saved");
    }
    });
  }
  exports.searchheatnoFn=function(searchval,callback){
    callback=callback||function(){};
    	connection.query("select * from heatno_batchno_mapping where heat_number='"+searchval+"'",function(err,rows){
    	if(rows.length>0){
          return callback(rows);
        }
      else{
        return callback(searchval);
      }
      });
  }
  exports.insert_ht_bt_noFn=function(htno_btno_val,callback){
    callback=callback||function(){};
      connection.query("INSERT INTO heatno_batchno_mapping SET ?",[htno_btno_val],function(err,result){
      if(!err){
          return callback("inserted");
        }
      else{
        return callback("didn't insert");
      }
      });
  }
