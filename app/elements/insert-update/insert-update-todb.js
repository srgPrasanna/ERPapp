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
