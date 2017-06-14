var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var jsonfile   = require('jsonfile');
var app = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var server=app.listen(4000,'127.0.0.1',function(err){
  var host=server.address().address;
  var port=server.address().port;
  if(!err){
    console.log("Listening at http://%s:%s", host, port);
  }
  else {
    console.error(err);
  }
})

var connection;
var connectdb=require("./app/script/connectdb.js");
  require('fs').readFile('./app/config/getconnection.json','utf8',function(err,data){
    dbjson=JSON.parse(data);
    global.connection=mysql.createConnection({
      host:dbjson[0].host,
      port:dbjson[0].port,
      user:dbjson[0].user,
      password:dbjson[0].password,
      database:dbjson[0].database
    });
    global.connection.connect(function(err){
      if(!err){
        console.log("Connected with database");
      }
      else {
        console.log("Failed to connect with database!");
      }
    });
  });

app.use(express.static('app'));

app.get('/' ,function (req, res) {
  res.sendFile( "app/index.html" );
});

//**********************************LOGIN PROCESS
//login-card
app.post('/login', urlencodedParser, function (req, res) {
  var response={
    emp_id:req.query.empid,
    password:req.query.password
  };
  var role;
  	global.connection.query("SELECT * FROM od_hr_employee_role where emp_id='"+req.query.empid+"' and password='"+req.query.password+"'",function(err,rows){
  	if(rows.length>0){
      global.role=rows[0].role;
      var roleid;
      global.roleid=rows[0].role_id;
      global.connection.query("select * from service_config_login_menu where menu_id in(SELECT menu_id FROM menu_map where role_id='"+global.roleid+"')",function(err,rows){
        res.status(200).json({'returnval': rows,'role':global.role});
        });
      }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});
//**********************************END

//**********************************CREATE ITEM PROCESSES
var itemdetailsdb=require("./app/elements/item-details/item-details-todb.js");
//item container details
app.post('/itemContainer', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitemContainer(function(itemContainerData){
    if(itemContainerData!=null)
      res.status(200).json({'returnval':itemContainerData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//item type details
app.post('/itemType', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitemType(function(itemTypeData){
    if(itemTypeData!=null)
      res.status(200).json({'returnval':itemTypeData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//item Unit of measure details
app.post('/itemUnit', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.searchitemUnit(function(itemUnitData){
    if(itemUnitData!=null)
      res.status(200).json({'returnval':itemUnitData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//add items save process
app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
  itemdetailsdb.insertitems(req.query.sid,req.query.id,req.query.name,req.query.description,req.query.specification1,req.query.specification2,req.query.container,req.query.unit,req.query.group,req.query.type,req.query.itemstatus,req.query.ptype,req.query.warehouselocation,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });
});
//add item search process
app.post('/searchitem', urlencodedParser, function (req, res) { //add item search process
  itemdetailsdb.itemdetailssearchitem(req.query.name,function(itemdetails,suppliers){
    if(itemdetails||suppliers!=null)
      res.status(200).json({'returnval':itemdetails,'returnval1':suppliers});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});
//*********************************END

//*********************************CEO APPROVAL PROCESSES
var itemapprovaldb=require("./app/elements/call-ceo-card/call-ceo-card-todb.js")
app.post('/ceoitemsearch', urlencodedParser, function (req, res) {
  itemapprovaldb.ceosearchitem(function(callback,fgrows){ // Other than Finished Goods
    if(callback||fgrows!=null){
      res.status(200).json({'returnval': callback,'returnfg': fgrows});
    }
    else{
      res.status(200).json({'returnval': "No Data"});
    }
  });
});

app.post('/ceoresponse', urlencodedParser, function (req, res) {
  itemapprovaldb.ceoresponse(req.query.respond,req.query.itemid,req.query.itemtype,function(callback){
    if(callback=="Updated"){
      res.status(200).json({'returnval': "Updated"});
    }
    else{
      res.status(200).json({'returnval': "Not Updated!"});
    }
  });
});
//********************************END

//********************************ITEM TO SUPPLIER MAPPING
var mapItemsDB=require("./app/elements/item-details/map-items-todb.js");
app.post('/mapitem', urlencodedParser, function (req, res) {
  mapItemsDB.mapitem(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

app.post('/mapsupplier', urlencodedParser, function (req, res) {
  mapItemsDB.mapsupplier(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

var itemToAddSupplier=require("./app/elements/item-details/item-to-addsupplier.js");
app.post ('/fixsupplier', urlencodedParser, function (req, res) {
  itemToAddSupplier.fixSupplier(req.query.item,req.query.supplier,req.query.pricing,req.query.date,function(callback){
    if(callback=="Supplier Added"){
      res.status(200).json({'returnval': "Supplier Added"});
    }
    else{
      res.status(200).json({'returnval': "Failed to add!"});
    }
  });
});
//*******************************END

var itemqualitytestingDB=require("./app/elements/item-quality-testing/item-quality-testing-todb.js");
app.post ('/testingdata', urlencodedParser, function (req, res) {
  itemqualitytestingDB.gettestingdata(function(testingdata){
    if(testingdata.length>0)
      res.status(200).json({'testingdata': testingdata});
    else
      res.status(200).json({'testingdata': "No testingdata!"});
  });
});

app.post ('/saveactual', urlencodedParser, function (req, res) {
  itemqualitytestingDB.qtest(req.query.id,req.query.actualvalue,req.query.status,function(callback){
    if(callback=="Saved")
      res.status(200).json({'serverres': "Saved"});
    else
      res.status(200).json({'serverres': "Not Saved!"});
  });
});

//********************************WAREHOUSE DETAILS
//retieves warehouse id and names from database and inserts it into dropdown menu
var warehousedetailsDB=require("./app/elements/warehouse-details/warehouse-details-todb.js");
app.post ('/warehousedetails', urlencodedParser, function (req, res) {
  warehousedetailsDB.getwarehousedetails(function(whdata){
    if(whdata.length>0)
      res.status(200).json({'whdata': whdata});
    else
      res.status(200).json({'whdata': "No Data!"});
  });
});
//*******************************END

//********************************REQUISITION CREATION AND APPROVAL PROCESS
var requisitionDB=require("./app/elements/requisition-process/requisition-process-todb.js");
app.post ('/searchrequisitionitem', urlencodedParser, function (req, res) {
  requisitionDB.getrequisitionitem(req.query.itemname,function(itemdetails){
    if(itemdetails.length>0)
      res.status(200).json({'itemdetails': itemdetails});
    else
      res.status(200).json({'itemdetails': "No Data!"});
  });
});

app.post ('/searchitemnames', urlencodedParser, function (req, res) {
  requisitionDB.requisitionsearchitem(req.query.role,function(itemnames){
    if(itemnames.length>0)
      res.status(200).json({'itemnames': itemnames});
    else
      res.status(200).json({'itemnames': "No Data!"});
  });
});

app.post ('/requisitionsave', urlencodedParser, function (req, res) {
  requisitionDB.saverequisition(req.query.requisitionid,req.query.iid,req.query.selectedtype,req.query.itemspec1,req.query.whlocation,req.query.selectedcontainer,req.query.itemquantity,req.query.requisitiondate,req.query.requireddate,function(response){
    if(response=="Saved")
      res.status(200).json({'status': "Saved"});
    else
      res.status(200).json({'status': "Not Saved!"});
  });
});

var requisitionapprovalDB=require("./app/elements/call-requisition-approval/call-requisition-todb.js");
app.post ('/requisitionapproval', urlencodedParser, function (req, res) {
  requisitionapprovalDB.searchrequisition(req.query.role,function(requisitions){
    if(requisitions!=null)
      res.status(200).json({'requisitions': requisitions});
    else
      res.status(200).json({'requisitions': "No requisitions!"});
  })
});

app.post('/requisitionresponse', urlencodedParser, function (req, res) {
  requisitionapprovalDB.requisitionresponse(req.query.itemid,req.query.requisitionno,req.query.respond,function(callback){
    if(callback=="Updated"){
      res.status(200).json({'returnval': "Updated"});
    }
    else{
      res.status(200).json({'returnval': "Not Updated!"});
    }
  });
});
//********************************END

//********************************AUTOCOMPLETE ITEM NAMES AND SUPPLIER NAMES
app.post('/autocompleteitemdetails', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(item_name) as item_name,item_id FROM md_procurement_item_detail",function(err,rows){
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

app.post('/autocompletesuppliername', urlencodedParser, function (req, res) {
  global.connection.query("SELECT supplier_name,supplier_id from md_procurement_supplier_detail",function(err,rows){
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});
//********************************END

//********************************REQUISITION STORES PROCESS
var requisitionStoresDB=require("./app/elements/requisition-stores/requisition-stores-todb.js");
app.post ('/storesrequisitions', urlencodedParser, function (req, res) {
  requisitionStoresDB.getstoresrequisitions(function(requisitionstoresdata){
    if(requisitionstoresdata.length>0)
      res.status(200).json({'requisitionstoresdata': requisitionstoresdata});
    else
      res.status(200).json({'requisitionstoresdata': "No Data!"});
  });
});

app.post ('/requisitionitemsupply', urlencodedParser, function (req, res) {
  requisitionStoresDB.supplyitem(req.query.autoid,req.query.reqno,req.query.containerquantity,req.query.supplyquantity,req.query.datetime,req.query.status,req.query.itemid,function(requisitionsupply){
    if(requisitionsupply=="Item Supplied")
      res.status(200).json({'processstatus': "Item Supplied"});
    else
      res.status(200).json({'processstatus': "Item Not Supplied!"});
  });
});
//********************************END

//*******************************Insert and update element
var insertQueryPath=require("./app/elements/insert-update/insert-update-todb.js");
app.post ('/testinsert', urlencodedParser, function (req, res) {
  insertQueryPath.insert(req.query.mySQLQuery,function(callback){
    if(callback=="Inserted")
      res.status(200).json({'status': "Inserted"});
    else
      res.status(200).json({'status': "Not Inserted!"});
  });
});
//******************************END

//********************************Customer billing and shipping address
//Customer billing address
var customerbillshipPath=require("./app/elements/billing-address/customer-bill-ship-todb.js");
app.post ('/insertcustomerbill', urlencodedParser, function (req, res) {
  customerbillshipPath.insertcustomerbill(req.query,function(callback){
    if(callback=="Billed")
      res.status(200).json({'status': "Billed Successfully"});
    else
      res.status(200).json({'status': "Error While Billing!"});
  });
});
//CUstomer shipping address
app.post ('/insertcustomership', urlencodedParser, function (req, res) {
  customerbillshipPath.insertcustomership(req.query,function(callback){
    if(callback=="Shipped")
      res.status(200).json({'status': "Shipped Successfully"});
    else
      res.status(200).json({'status': "Error While Shipping!"});
  });
});
//search customer all billing address
app.post ('/searchcustomerbilladdress', urlencodedParser, function (req, res) {
  customerbillshipPath.searchcustomerbills(req.query,function(callback){
    if(callback!=null)
      res.status(200).json({'data': callback});
    else
      res.status(200).json({'data': "No Billing Address found!"});
  });
});
//search customer all shipping address
app.post ('/searchcustomershipaddress', urlencodedParser, function (req, res) {
  customerbillshipPath.searchcustomership(req.query,function(callback){
    if(callback!=null)
      res.status(200).json({'data': callback});
    else
      res.status(200).json({'data': "No Billing Address found!"});
  });
});
//*******************************END

//*******************************Supplier Billing Address
var supplierbillPath=require("./app/elements/call-add-supplier/supplier-billing-todb.js");
app.post ('/insertsupplierbill', urlencodedParser, function (req, res) {
  supplierbillPath.insertsupplierbill(req.query,function(callback){
    if(callback=="Billed")
      res.status(200).json({'status': "Billed Successfully"});
    else
      res.status(200).json({'status': "Error While Billing!"});
  });
});

//*******************************END
//salessummary
// var salessummarydb=require("./app/elements/salesorder-summary/salessummarydb.js");
// app.post('/fetch', urlencodedParser, function (req, res) {
// salessummarydb.fetch(function(rows){
//     if(rows!="reject"){
//       res.status(200).json({'returnval': rows});
//     }
//     else
//       res.status(200).json({'returnval': "Invalid!"});
//   });
// });

//timelinechart
var timelinedb=require("./app/elements/timeline-chart/timelinedb.js");
app.post('/timelinefetch', urlencodedParser, function (req, res) {
  timelinedb.timelinefetch(req.query.salesid,req.query.itemssid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//sliderbar
var sliderfetchdb=require("./app/elements/slider-barnew/sliderdb.js");
app.post('/sliderchange', urlencodedParser,function (req, res) {
  sliderfetchdb.sliderchange(req.query.itemssid,function(rows,callback){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});

// vehicle securitycard
app.post('/securityinfo', urlencodedParser, function (req, res) {
  connectdb.securityjsonsaveFn(req.query.invNum,req.query.saleid,req.query.invDate,req.query.delqunty,
    req.query.vehouttime,function(err,rows){
    if(rows="json writed"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Json not writed"});
  });
  });

//supplier item
  app.post('/supplieritempostinfo', urlencodedParser, function (req,res) {
    var response={supplierid:req.query.supid,
                  itemid:req.query.itemid};
      connectdb.supplieritempostFn(response,function(rows){
        if(rows=="saved"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "not saved"});
      });
      });

  //customer item
  app.post('/customeritempostinfo', urlencodedParser, function (req,res) {
        var response={customerid:req.query.supid,
                      itemid:req.query.itemid};
          connectdb.customeritempostFn(response,function(rows){
            if(rows=="saved"){
              res.status(200).json({'returnval': rows});
            }
            else
              res.status(200).json({'returnval': "not saved"});
          });
          });

  //searchsupplier
  app.post('/searchsupplierid', urlencodedParser, function (req,res) {
          var response={supname:req.query.supname}
          connectdb.searchsupplieridFn(response,function(rows){
            if(rows!="not get"){
          if(rows.length>0){
            res.status(200).json({'returnval': rows});
                }
              }
          else
            res.status(200).json({'returnval': "does not get supplier details"});
            });
        });
        // app.post ('/autogenerateid', urlencodedParser, function (req, res) {
        //   connectdb.generateIdFn(function(retrievedData){
        //     if(retrievedData>=0)
        //       res.status(200).json({'returnid': retrievedData});
        //     else
        //       res.status(200).json({'returnid': "No ID to Generate!"});
        //   });
        // });
//searchcustomer
app.post('/searchcustomerid', urlencodedParser, function (req,res) {
  console.log(req.query.supname);
          var response={supname:req.query.supname}
          connectdb.searchcustomeridFn(response,function(rows){
            if(rows!="not get"){
          if(rows.length>0){
            res.status(200).json({'returnval': rows});
                }
              }
          else
            res.status(200).json({'returnval': "please enter valid customername"});
            });
        });

//security search
app.post('/loopsecuritysearchinfo', urlencodedParser, function (req,res) {
connectdb.loopsecuritysearchFn(req.query.salid,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "does not get saleid"});
});
});

// supplier item mapping
app.post('/supplieritem_map', urlencodedParser, function (req,res) {
  connectdb.supplieritem_mapFn(function(rows){
    if(rows.length>0){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "didn't get value"});
  });
  });

  //customer item mapping
  app.post('/customeritem_map', urlencodedParser, function (req,res) {
    connectdb.customeritem_mapFn(function(rows){
      if(rows.length>0){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "didn't get value"});
    });
    });

    //auto security search
app.post('/autosecuritysearchinfo', urlencodedParser, function (req,res) {
  connectdb.autosecuritysearchFn(function(rows){
    if(rows!="reject"){
      // console.log(rows);
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "does not get vehicleno"});
  });
  });

  //security search
  app.post('/securitysearchinfo', urlencodedParser, function (req,res) {
    connectdb.securitysearchFn(req.query.searchvehiclenum,function(rows){
      if(rows!="reject"){
        // console.log(rows);
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get vehicel no"});
    });
    });

//CEO customer

app.post('/ceocustomerapprovalinfo', urlencodedParser, function (req, res) {
var response={customerid:req.query.cuid,
              status:req.query.radio};
connectdb.ceocustomeapprovalFn(response,function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "customer table doesn't updated"});
});
});


app.post('/ceocustomerajaxinfo', urlencodedParser, function (req, res) {
connectdb.ceocustomerajaxFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "ceo-customer-card.json not created"});
});
});

//vehicle fetch
app.post('/vehiclefetch', urlencodedParser, function (req, res) {
connectdb.vehiclefetch(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "vehicle.json not created"});
});
});

//search sales order
app.post('/searchsalesorder', urlencodedParser, function (req, res) {
connectdb.searchsalesorderconncetdbFn(function(rows){
  if(rows!="reject"){
    res.status(200).json({'returnval': rows});
  }
  else
    res.status(200).json({'returnval': "Invalid salesordercreate id"});
});
});

//vehicle IN
app.post('/vehsavedata', urlencodedParser, function (req, res) {
var response={
  vehnoval:req.query.VehicleNoval,
  drivnameval:req.query.DriverNameval,
  drivmobnoval1:req.query.DriverMobNumberval1,
  drivmobnoval2:req.query.DriverMobNumberval2,
  ownmobnumberval:req.query.OwnMobNumberval,
  vehtimeval:req.query.Vehintimeval,
  vehtime2val:req.query.Vehoutimeval,
  vehdateval:req.query.Vehdateval
};

connection.query('INSERT INTO vehicle_table SET ?',[response],function(err,result){
  if(!err)
    res.status(200).json({'datavalue': "Saved!"});
  else
    res.status(200).json({'datavalue': "Unable to save!"});
  });
});

// customer data
app.post('/savedata', urlencodedParser, function (req, res) {
  var response={
    customerid:req.query.sidval,
  	customername:req.query.snameval,
  	address1:req.query.adval1,
  	address2:req.query.adval2,
    address3:req.query.adval3,
    city:req.query.citynameval,
    state:req.query.stateVal,
    country:req.query.countryVal,
    pincode:req.query.pinval,
    mobile1:req.query.mobnumval1,
    mobile2:req.query.mobnumval2,
    email:req.query.emidval,
    status:req.query.statusval
  };
  connectdb.savecustomertdetFn(response,function(result){
    if(result=="saved"){
      res.status(200).json({'datavalue': "Saved!"});
    }
    else {
      res.status(200).json({'datavalue': "Not Saved!"});
    }
  });
});
//supplier data
app.post('/savesupplierdata', urlencodedParser, function (req, res) {
  var response={
    supplierid:req.query.sidval,
  	suppliername:req.query.snameval,
  	address1:req.query.adval1,
  	address2:req.query.adval2,
    	address3:req.query.adval3,
    	city:req.query.citynameval,
    	state:req.query.stateVal,
    	country:req.query.countryVal,
    	pincode:req.query.pinval,
    	mobile1:req.query.mobnumval1,
    	mobile2:req.query.mobnumval2,
    	email:req.query.emidval,
    	status:req.query.statusval
  };
  connectdb.savesupplierdetFn(response,function(result){
    if(result=="saved"){
      res.status(200).json({'datavalue': "Saved!"});
    }
    else {
      res.status(200).json({'datavalue': "Not Saved!"});
    }
  });
});

//tax info
app.post('/Taxsaveinfo', urlencodedParser, function (req, res) {
var response={
  pan:req.query.pan_no,
  tann:req.query.tann_no,
  cin:req.query.cin_no,
  tin:req.query.tin_no,
  cst:req.query.cst_no
  };
connection.query('INSERT INTO tax_card SET ?',[response],function(err,result){
  if(result.affectedRows>0)
    res.status(200).json({'returnval': "Saved!"});

  else
      res.status(200).json({'returnval': "Unable to save!"});
  });
});

//search tax
app.post('/searchtax', urlencodedParser, function (req, res) {
var response={
  pan:req.query.pan_no
};
  connection.query('Select * FROM tax_card WHERE ?',[response],function(err,rows){
  if(rows.length>0)
    res.status(200).json({'returnval': rows});
  else{
    res.status(200).json({'returnval': "Data not found!"});
  }
  });
});

//save excise_card
app.post('/saveexcise', urlencodedParser, function (req, res) {
var response={
  cexregno:req.query.value1,
  eccno:req.query.value2,
  range:req.query.value3,
  division:req.query.value4,
  excise_cardcol:req.query.value5,
  servicetaxno:req.query.value6
  };
connection.query('INSERT INTO excise_card SET ?',[response],function(err,result){
  if(result.affectedRows>0)
    res.status(200).json({'returnval': "Saved!"});

  else
      res.status(200).json({'returnval': "Unable to save!"});
  });
});

//sales vehicle order
app.post('/savesalesvehicleorder', urlencodedParser, function(req,res) {
var response={goodsvehiclenumber:req.query.vehno,
              salesorderid:req.query.salid
              };
  connectdb.savesalesorderconncetdbFn(response,function(data){
  if(rows="saved"){
  res.status(200).json({'returnval': "data saved"});
}
  else{

  res.status(200).json({'returnval': "data not saved"});
}
});
});

//auto complete
app.post('/autocomplete', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(customername) as customername,customerid,city FROM m_customerdetail",function(err,rows){
    // console.log("adfasf:"+JSON.stringify(rows));
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});


//bar-chart
var barchart=require("./app/elements/barchart-card/barchart-card-todb.js");
app.post('/barcharttablefetch',urlencodedParser,function (req, res) {
  barchart.barcharttablefetch(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});

});
});

// ***************************SALES ORDER ******************************
// // sales order page
var salespersondb=require("./app/elements/sales-order/sales-order-todb.js");
app.post('/salesinsert', urlencodedParser, function (req, res) {
  console.log("working");
  // console.log(req.query.salesid+req.query.datetimeq+req.query.customerid+req.query.id+req.query.description+req.query.ispecification+req.query.rcoilsq+req.query.rtonq+req.query.rdqty+req.query.datetimeq1+req.query.status);
  salespersondb.insertsales(req.query.salesid,req.query.datetimeq,req.query.customerid,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback=="SAVED"){
      console.log("saved");
    res.status(200).json({'returnval':"SAVED"});
}
    else {
      console.log("not saved");
    res.status(200).json({'returnval':"not saved"});
    console.log(err);
    }
  })
});

// ****fetching containername by using id ***
var containerdbpath2=require("./app/elements/sales-order/sales-order-todb.js");
app.post('/containeridfetch2', urlencodedParser, function (req, res) {
  // console.log("containeridfetch2");
  containerdbpath2.containeridfetch2(req.query.itemid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// **fetching unitofmeasurename by using id  *****
var quantitydbpath2=require("./app/elements/sales-order/sales-order-todb.js");
app.post('/quantityidfetch2', urlencodedParser, function (req, res) {
  // console.log("containeridfetch2containeridfetch2");
  quantitydbpath2.quantityidfetch2(req.query.itemid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// ****************************************************************************
// sales projection insertsales

var salespersondb1=require("./app/elements/sales-projection/sales-projection-todb.js");
app.post('/salesinsert1', urlencodedParser, function (req, res) {
  console.log("working");
  // console.log(req.query.salesid+req.query.datetimeq+req.query.customerid+req.query.id+req.query.description+req.query.ispecification+req.query.rcoilsq+req.query.rtonq+req.query.rdqty+req.query.datetimeq1+req.query.status);
  salespersondb1.insertsales1(req.query.salesid,req.query.datetimeq,req.query.customerid,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback=="SAVED"){
      console.log("saved");
    res.status(200).json({'returnval':"SAVED"});
    }
    else {
      console.log("not saved");
    res.status(200).json({'returnval':"not saved"});
    console.log(err);
    }
  })
});


//sales order Projection update
var salespersondb=require("./app/elements/salesorder-projection/salesorder-projection-todb.js");
app.post('/salesupdate', urlencodedParser, function (req, res) {
  console.log("working");
  // console.log(req.query.salesid+req.query.datetimeq+req.query.customerid+req.query.id+req.query.description+req.query.ispecification+req.query.rcoilsq+req.query.rtonq+req.query.rdqty+req.query.datetimeq1+req.query.status);
  salespersondb.updatesales(req.query.salesid,req.query.datetimeq,req.query.customerid,req.query.id,req.query.description,req.query.ispecification,req.query.rcoilsq,req.query.rtonq,req.query.rdqty,req.query.datetimeq1,req.query.status,function(callback){
    if(callback=="SAVED"){
      console.log("saved");
      res.status(200).json({'returnval':"SAVED"});
  }
    else {
      console.log("not saved");
    res.status(200).json({'returnval':"NOT  SAVED"});
    console.log(err);
    }
  })
});

//sales-projection

// ****fetching containername by using id ***
var containerdbpath1=require("./app/elements/sales-projection/sales-projection-todb.js");
app.post('/containeridfetch1', urlencodedParser, function (req, res) {
  console.log("containeridfetch1");
  containerdbpath1.containeridfetch1(req.query.itemid,function(rows){
    console.log(JSON.stringify(rows));
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
// **fetching unitofmeasurename by using id  *****
var quantitydbpath1=require("./app/elements/sales-projection/sales-projection-todb.js");
app.post('/quantityidfetch1', urlencodedParser, function (req, res) {
  quantitydbpath1.quantityidfetch1(req.query.itemid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var salessummarydb=require("./app/elements/salesprojection-summary/salessummarydb.js");
app.post('/fetch1', urlencodedParser, function (req, res) {
salessummarydb.fetch1(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});


//readable sales- summary
var salesproorder=require("./app/elements/salesprojection-summary/salessummarydb.js");
app.post('/salespro', urlencodedParser,function (req, res) {
  salesproorder.salespro(req.query.salesorderid,function(rows){
    if(rows!="reject"){
      console.log("server"+JSON.stringify(rows));
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});

//auto complete
app.post('/autocomplete', urlencodedParser, function (req, res) {
  global.connection.query("SELECT UPPER(customername) as customername,customerid,city FROM m_customerdetail",function(err,rows){
    // console.log("adfasf:"+JSON.stringify(rows));
  if(rows.length>0){
    // console.log("here:"+JSON.stringify(rows));
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

//auto complete item
app.post('/autocompleteitem', urlencodedParser, function (req, res) {
// console.log("select distinct finishedgoods_itemtype.itemid,UPPER(finishedgoods_itemtype.itemname) as itemname FROM finishedgoods_itemtype inner join item_customer_map on item_customer_map.itemid=finishedgoods_itemtype.itemid inner join salesordercreate on salesordercreate.customerid = item_customer_map.customerid where salesordercreate.customerid='"+req.query.customerid+"'");
  global.connection.query("select distinct md_sales_finishedgoods_item_detail.item_id,UPPER(md_sales_finishedgoods_item_detail.item_name) as item_name FROM md_sales_finishedgoods_item_detail inner join od_sales_item_customer_mapping on od_sales_item_customer_mapping.item_id=md_sales_finishedgoods_item_detail.item_id inner join md_sales_customer_detail on md_sales_customer_detail.customer_id = od_sales_item_customer_mapping.customer_id where md_sales_customer_detail.customer_id='"+req.query.customerid+"'",function(err,rows){
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});

//auto complete location

app.post('/autocompletelocation', urlencodedParser, function (req, res) {
  // console.log("select distinct UPPER(m_customerdetail.city) as city FROM m_customerdetail inner join item_customer_map on item_customer_map.customerid=m_customerdetail.customerid inner join salesordercreate on salesordercreate.customerid = item_customer_map.customerid where salesordercreate.customerid='"+req.query.customerid+"'");
  global.connection.query("select distinct UPPER(m_customerdetail.city) as city FROM m_customerdetail where customerid='"+req.query.customerid+"'",function(err,rows){
  if(rows.length>0){
    res.status(200).json({'returnval': rows});
    }
  else
    res.status(200).json({'returnval': "Invalid!"});
  });
});
// ***************************SALES ORDER END ******************************

// ***************************SALES LOGISTICS- TIMELINE ******************************
var vehicledb=require("./app/elements/timeline-chartlogistics/timelinedblog.js");
app.post('/vehicleupdateserver', urlencodedParser, function (req, res) {
  console.log("working1");
    vehicledb.updatevehicle(req.query.x,req.query.y,req.query.vehicleno,function(callback){
    if(callback==saved){
      console.log("saved");
      res.status(200).json({'returnval':"saved"});
      console.log(err);}
    else {
      console.log("not saved");
      res.status(200).json({'returnval':"not saved"});
      console.log(err);
    }
  })
});
var vehicledb1=require("./app/elements/timeline-chartlogistics/timelinedblog.js");
app.post('/vehicleupdateendserver', urlencodedParser, function (req, res) {
  console.log("working2");
    vehicledb1.updatevehicleend(req.query.x,req.query.y,req.query.vehicleno,function(callback){
    if(callback==saved){
      console.log("saved");
      res.status(200).json({'returnval':"saved"});
      console.log(err);}
    else {
      console.log("not saved");
      res.status(200).json({'returnval':"not saved"});
      console.log(err);
    }
  })
});

// ***************************SALES LOGISTICS- TIMELINE --END *********************

//itemcard
var itemdesigndb=require("./app/elements/item-customerdetail/itemdesigndb.js");

app.post('/itemfetch', urlencodedParser, function (req, res) {
  itemdesigndb.itemfetch(req.query.itemssid,function(callback,rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//customercard
var customerdesigndb=require("./app/elements/item-customerdetail/customerdesigndb.js");

app.post('/customerfetch', urlencodedParser, function (req, res) {
  console.log("hsjsha"+req.query.customerid);
  customerdesigndb.customerfetch(req.query.customerid,function(rows){
    console.log(rows);
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//timeline chart
var timelinedb=require("./app/elements/timeline-chart/timelinedb.js");
app.post('/timelinefetch', urlencodedParser, function (req, res) {
  timelinedb.timelinefetch(req.query.salesid,req.query.itemssid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});


//slider chart
var sliderfetchdb=require("./app/elements/slider-barnew/sliderdb.js");
app.post('/sliderchange', urlencodedParser,function (req, res) {
  sliderfetchdb.sliderchange(req.query.itemssid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  });
});

//vehicle card
var vehicle_card=require("./app/elements/vehicle-card/vehicle-card-todb.js");
app.post('/vehiclesavedata', urlencodedParser, function (req, res) {
  vehicle_card.vehiclesavedata(req.query.VehicleNoval,req.query.VehicleNameval,req.query.DriverNameval,req.query.DrivMobNumberval1,req.query.DrivMobNumberval2,req.query.OwnerNameval,req.query.OwnMobNumberval,req.query.Vehintimeval,req.query.Vehindateval,req.query.selectedstate,function(callback){
    if(callback=="saved!"){
      res.status(200).json({'returnval': "Saved!"});
    }
    else{
      res.status(200).json({'returnval': "Unable to save!"});
    }
  });

});

app.post('/stores', urlencodedParser, function (req,res) {
    connectdb.storeFn(function(rows){
      if(rows!="reject"){
        res.status(200).json({'returnval': rows});
      }
      else
        res.status(200).json({'returnval': "does not get saleid"});
    });
    });
    app.post('/purchase', urlencodedParser, function (req,res) {
      connectdb.purchaseFn(function(rows){
        if(rows!="reject"){
          res.status(200).json({'returnval': rows});
        }
        else
          res.status(200).json({'returnval': "does not get saleid"});
      });
      });
var supplierautocompletedb=require("./app/elements/vehicle-in-process-suppliername/supplierautocompletedb.js");
app.post('/supplierautocomplete',urlencodedParser,function (req, res) {

  supplierautocompletedb.supplierautocomplete(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});

var itemautocompletedb=require("./app/elements/vehicle-in-process-itemdetails/itemautocompletedb.js");
app.post('/itemdescriptionautocomplete', urlencodedParser, function (req, res) {
  itemautocompletedb.itemdescriptionautocomplete(req.query.suppliername,req.query.supplierid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
var containerdbpath=require("./app/elements/vehicle-in-process-itemdetails/containerdb.js");
app.post('/containeridfetch', urlencodedParser, function (req, res) {
  containerdbpath.containeridfetch(req.query.containeridvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
var quantitydbpath=require("./app/elements/vehicle-in-process-itemdetails/quantitydb.js");
app.post('/quantityidfetch', urlencodedParser, function (req, res) {
  quantitydbpath.quantityidfetch(req.query.unitofmeasureidvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var invoicedbpath=require("./app/elements/vehicle-in-process-itemdetails/invoiceprocessdb.js");
app.post('/invoicesaving', urlencodedParser, function (req, res) {
  invoicedbpath.invoicesaving(req.query.invoicenovalue,req.query.invoicedatevalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "Invoice detail saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var vehicledbpath=require("./app/elements/vehicle-in-process-itemdetails/vehicleprocessdb.js");
app.post('/vehiclesaving', urlencodedParser, function (req, res) {
  vehicledbpath.vehiclesaving(req.query.vehiclenamevalue,req.query.vehiclenovalue,req.query.drivernamevalue,req.query.drivernovalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "vehicle detail saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});
var supplierdbpath=require("./app/elements/vehicle-in-process-itemdetails/supplierprocessdb.js");
app.post('/supplieridsaving', urlencodedParser, function (req, res) {
  supplierdbpath.supplieridsaving(req.query.supplieridvalue,req.query.irnnumber,req.query.item_id,req.query.containeridvalue,req.query.unitofmeasureidvalue,req.query.remarks,req.query.containergetvalue,req.query.qtygetvalue,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "supplierdetails saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});
var supplierautocompletedb=require("./app/elements/vehicle-in-process-suppliername/supplierautocompletedb.js");
app.post('/supplierautocomplete',urlencodedParser,function (req, res) {
  supplierautocompletedb.supplierautocomplete(function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
});
});

var itemautocompletedb=require("./app/elements/vehicle-in-process-itemdetails/itemautocompletedb.js");
app.post('/itemdescriptionautocomplete', urlencodedParser, function (req, res) {
  itemautocompletedb.itemdescriptionautocomplete(req.query.suppliername,req.query.supplierid,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});
var containerdbpath=require("./app/elements/vehicle-in-process-itemdetails/containerdb.js");
app.post('/containeridfetch', urlencodedParser, function (req, res) {
  containerdbpath.containeridfetch(req.query.containeridvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var quantitydbpath=require("./app/elements/vehicle-in-process-itemdetails/quantitydb.js");
app.post('/quantityidfetch', urlencodedParser, function (req, res) {
  quantitydbpath.quantityidfetch(req.query.unitofmeasureidvalue,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': rows});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var autoGenerateID=require("./app/elements/check-autogenid/autogen-id-todb.js");
app.post ('/autogenerateid', urlencodedParser, function (req, res) {
  autoGenerateID.generateId(function(retrievedData){
    if(retrievedData>=0)
      res.status(200).json({'returnid': retrievedData});
    else
      res.status(200).json({'returnid': "No ID to Generate!"});
  });
});

var invoicedbpath=require("./app/elements/vehicle-in-process-itemdetails/invoiceprocessdb.js");
app.post('/invoicesaving', urlencodedParser, function (req, res) {
  invoicedbpath.invoicesaving(req.query.invoicenovalue,req.query.invoicedatevalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "Invoice detail saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

var vehicledbpath=require("./app/elements/vehicle-in-process-itemdetails/vehicleprocessdb.js");
app.post('/vehiclesaving', urlencodedParser, function (req, res) {
  vehicledbpath.vehiclesaving(req.query.vehiclenamevalue,req.query.vehiclenovalue,req.query.drivernamevalue,req.query.drivernovalue,req.query.irnnumber,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "vehicle detail saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});

var supplierdbpath=require("./app/elements/vehicle-in-process-itemdetails/supplierprocessdb.js");
app.post('/supplieridsaving', urlencodedParser, function (req, res) {
  supplierdbpath.supplieridsaving(req.query.supplieridvalue,req.query.irnnumber,req.query.item_id,req.query.containeridvalue,req.query.unitofmeasureidvalue,req.query.remarks,req.query.containergetvalue,req.query.qtygetvalue,function(rows){
    if(rows=="saved"){
      res.status(200).json({'returnval': "supplierdetails saved"});
    }
    else
      res.status(200).json({'returnval': "Not saved!"});
  });
});


var dbnamefetchpath=require("./app/elements/generic-mapping/dbnamefetchdb.js");
app.post('/dbnamefetch', urlencodedParser, function (req, res) {
  console.log("hi");
  dbnamefetchpath.dbnamefetch(req.query.dbtoken,req.query.id1,req.query.id2,function(rows){
    if(rows!="reject"){
      res.status(200).json({'returnval': "saved"});
    }
    else
      res.status(200).json({'returnval': "Invalid!"});
  });
});

//This for Getting Quantity value of Sales order for  the specified date

app.post ('/productionsales', urlencodedParser, function (req, res) {
  global.connection.query('SELECT  sum(order_quantity) as OrderQuantity from od_sales_sales_order_detail where item_id= "'+req.query.order_itemid +'" and salesorder_date= "'+req.query.order_itemdate +'" and status= "'+req.query.order_itemstatus +'"',function(err,result){
  //  console.log(response);
  if(result.length>0)
    res.status(200).json({'message': result});
  else
    res.status(200).json({'message': "Data not available!"});
  });
});


//This for Getting Quantity value of Inventory for the Item
var inventoryServiceDB=require("./app/elements/inventory-service/inventory-dbservice.js");
app.post ('/productioninventory', urlencodedParser, function (req, res) {
  // global.connection.query('SELECT  sum(item_available_quantity) as avail_item_qty from od_item_inventory where item_id= "'+req.query.inventory_itemid +'"',function(err,result){
  // //  console.log(response);
  // if(result.length>0)
  //   res.status(200).json({'message': result});
  // else
  //   res.status(200).json({'message': "Data not available!"});
  // });
    inventoryServiceDB.getInventoryDetails(req.query.inventory_itemid, function(itdata){
      if(itdata.length>0){
        res.status(200).json({'itdata': itdata});
      }
      else
        res.status(200).json({'itdata': "No Data!"});
    });
});

var requisitionRequiredItemquantityServiceDB=require("./app/elements/requisition-required-itemquantity-service/requisition-required-itemquantity-dbservice.js");
app.post ('/requisitionRequiredItemquantityService', urlencodedParser, function (req,res) {
  requisitionRequiredItemquantityServiceDB.searchitemquantity(req.query.requisitionnumber, function(callback){
    if(callback!=null)
      res.status(200).json({'quantity': callback});
    else
      res.status(200).json({'quantity': "Quantity not available!"});
  });
});
