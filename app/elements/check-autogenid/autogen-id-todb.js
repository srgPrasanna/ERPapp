var mysql = require('mysql');
exports.generateId=function(callback){
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
