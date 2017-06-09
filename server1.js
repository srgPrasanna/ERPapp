var express    = require("express");
var mysql      = require('mysql');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var app = express();
var queryFile  = require("./app/script/query.js");

var connection;
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
//item container details
app.post('/itemContainer', urlencodedParser, function (req, res) { //add item search process
  queryFile.searchitemContainer(function(itemContainerData){
    if(itemContainerData!=null)
      res.status(200).json({'returnval':itemContainerData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//item type details
app.post('/itemType', urlencodedParser, function (req, res) { //add item search process
  queryFile.searchitemType(function(itemTypeData){
    if(itemTypeData!=null)
      res.status(200).json({'returnval':itemTypeData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//item Unit of measure details
app.post('/itemUnit', urlencodedParser, function (req, res) { //add item search process
  queryFile.searchitemUnit(function(itemUnitData){
    if(itemUnitData!=null)
      res.status(200).json({'returnval':itemUnitData});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});

//add items save process
app.post('/insertitems', urlencodedParser, function (req, res) { //add items save process
  queryFile.insertitems(req.query.sid,req.query.id,req.query.name,req.query.description,req.query.specification1,req.query.specification2,req.query.container,req.query.unit,req.query.group,req.query.type,req.query.itemstatus,req.query.ptype,req.query.warehouselocation,function(callback){
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
  queryFile.itemdetailssearchitem(req.query.name,function(itemdetails,suppliers){
    if(itemdetails||suppliers!=null)
      res.status(200).json({'returnval':itemdetails,'returnval1':suppliers});
    else
      res.status(200).json({'returnval':"No Data"});
  });
});
//*********************************END

//*********************************CEO APPROVAL PROCESSES
app.post('/ceoitemsearch', urlencodedParser, function (req, res) {
  queryFile.ceosearchitem(function(callback,fgrows){ // Other than Finished Goods
    if(callback||fgrows!=null){
      res.status(200).json({'returnval': callback,'returnfg': fgrows});
    }
    else{
      res.status(200).json({'returnval': "No Data"});
    }
  });
});

app.post('/ceoresponse', urlencodedParser, function (req, res) {
  queryFile.ceoresponse(req.query.respond,req.query.itemid,req.query.itemtype,function(callback){
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
app.post('/mapitem', urlencodedParser, function (req, res) {
  queryFile.mapitem(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

app.post('/mapsupplier', urlencodedParser, function (req, res) {
  queryFile.mapsupplier(function(callback){
    if(callback!=null){
      res.status(200).json({'returnval': callback});
    }
    else{
      res.status(200).json({'returnval': "Invalid!"});
    }
  })
});

app.post ('/fixsupplier', urlencodedParser, function (req, res) {
  queryFile.fixSupplier(req.query.item,req.query.supplier,req.query.pricing,req.query.date,function(callback){
    if(callback=="Supplier Added"){
      res.status(200).json({'returnval': "Supplier Added"});
    }
    else{
      res.status(200).json({'returnval': "Failed to add!"});
    }
  });
});
//*******************************END

app.post ('/testingdata', urlencodedParser, function (req, res) {
  queryFile.gettestingdata(function(testingdata){
    if(testingdata.length>0)
      res.status(200).json({'testingdata': testingdata});
    else
      res.status(200).json({'testingdata': "No testingdata!"});
  });
});

app.post ('/saveactual', urlencodedParser, function (req, res) {
  queryFile.qtest(req.query.id,req.query.actualvalue,req.query.status,function(callback){
    if(callback=="Saved")
      res.status(200).json({'serverres': "Saved"});
    else
      res.status(200).json({'serverres': "Not Saved!"});
  });
});

//********************************WAREHOUSE DETAILS
//retieves warehouse id and names from database and inserts it into dropdown menu
app.post ('/warehousedetails', urlencodedParser, function (req, res) {
  queryFile.getwarehousedetails(function(whdata){
    if(whdata.length>0)
      res.status(200).json({'whdata': whdata});
    else
      res.status(200).json({'whdata': "No Data!"});
  });
});
//*******************************END

//********************************REQUISITION CREATION AND APPROVAL PROCESS
app.post ('/searchrequisitionitem', urlencodedParser, function (req, res) {
  queryFile.getrequisitionitem(req.query.itemname,function(itemdetails){
    if(itemdetails.length>0)
      res.status(200).json({'itemdetails': itemdetails});
    else
      res.status(200).json({'itemdetails': "No Data!"});
  });
});

app.post ('/searchitemnames', urlencodedParser, function (req, res) {
  queryFile.requisitionsearchitem(req.query.role,function(itemnames){
    if(itemnames.length>0)
      res.status(200).json({'itemnames': itemnames});
    else
      res.status(200).json({'itemnames': "No Data!"});
  });
});

app.post ('/requisitionsave', urlencodedParser, function (req, res) {
  queryFile.saverequisition(req.query.requisitionid,req.query.iid,req.query.selectedtype,req.query.itemspec1,req.query.whlocation,req.query.selectedcontainer,req.query.itemquantity,req.query.requisitiondate,req.query.requireddate,function(response){
    if(response=="Saved")
      res.status(200).json({'status': "Saved"});
    else
      res.status(200).json({'status': "Not Saved!"});
  });
});

app.post ('/requisitionapproval', urlencodedParser, function (req, res) {
  queryFile.searchrequisition(req.query.role,function(requisitions){
    if(requisitions!=null)
      res.status(200).json({'requisitions': requisitions});
    else
      res.status(200).json({'requisitions': "No requisitions!"});
  })
});

app.post('/requisitionresponse', urlencodedParser, function (req, res) {
  queryFile.requisitionresponse(req.query.itemid,req.query.requisitionno,req.query.respond,function(callback){
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
app.post ('/storesrequisitions', urlencodedParser, function (req, res) {
  queryFile.getstoresrequisitions(function(requisitionstoresdata){
    if(requisitionstoresdata.length>0)
      res.status(200).json({'requisitionstoresdata': requisitionstoresdata});
    else
      res.status(200).json({'requisitionstoresdata': "No Data!"});
  });
});

app.post ('/requisitionitemsupply', urlencodedParser, function (req, res) {
  queryFile.supplyitem(req.query.autoid,req.query.reqno,req.query.containerquantity,req.query.supplyquantity,req.query.datetime,req.query.status,function(requisitionsupply){
    if(requisitionsupply=="Item Supplied")
      res.status(200).json({'processstatus': "Item Supplied"});
    else
      res.status(200).json({'processstatus': "Item Not Supplied!"});
  });
});
//********************************END

//********************************INSERT AND UPDATE
app.post ('/testinsert', urlencodedParser, function (req, res) {
  queryFile.insert(req.query.mySQLQuery,function(callback){
    if(callback=="Inserted")
      res.status(200).json({'status': "Inserted"});
    else
      res.status(200).json({'status': "Not Inserted!"});
  });
});
//********************************END

//********************************AUTOGENERATE ID
app.post ('/autogenerateid', urlencodedParser, function (req, res) {
  queryFile.checkgenerateId(function(retrievedData){
    if(retrievedData>=0)
      res.status(200).json({'returnid': retrievedData});
    else
      res.status(200).json({'returnid': "No ID to Generate!"});
  });
});
//********************************END

//********************************REQUISITION REQUIRED ITEM QUANTITY SERVICE
app.post ('/requisitionRequiredItemquantityService', urlencodedParser, function (req,res) {
  queryFile.searchitemquantity(req.query.requisitionnumber, function(callback){
    if(callback!=null)
      res.status(200).json({'quantity': callback});
    else
      res.status(200).json({'quantity': "Quantity not available!"});
  });
});
//********************************END

//********************************Customer billing and shipping address
//Customer billing address
app.post ('/insertcustomerbill', urlencodedParser, function (req, res) {
  queryFile.insertcustomerbill(req.query,function(callback){
    if(callback=="Billed")
      res.status(200).json({'status': "Billed Successfully"});
    else
      res.status(200).json({'status': "Error While Billing!"});
  });
});
//CUstomer shipping address
app.post ('/insertcustomership', urlencodedParser, function (req, res) {
  queryFile.insertcustomership(req.query,function(callback){
    if(callback=="Shipped")
      res.status(200).json({'status': "Shipped Successfully"});
    else
      res.status(200).json({'status': "Error While Shipping!"});
  });
});
//*******************************END

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
