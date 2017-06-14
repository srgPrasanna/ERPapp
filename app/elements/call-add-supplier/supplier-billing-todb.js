exports.insertsupplierbill=function(details,callback){
  var response={"supplier_id":details.billsupplierid,
                "supplier_email":details.billemail,
                "country_code":details.billcountry,
                "state_code":details.billstate,
                "city_name":details.billcity,
                "street_name":details.billstreet,
                "pincode":details.billpincodeno,
                "mobile_number":details.billmobile
              };
    connection.query("insert into od_sales_supplier_billing_address_details set ?",[response],function(err,billingstatus){
      if(billingstatus.affectedRows>0){
        connection.query('insert into od_supplier_bill_mapping (supplier_id,billing_id) values ("'+details.billsupplierid+'","'+details.billid+'");',function(err,billmapstatus){
          if(billmapstatus.affectedRows>0){
            return callback("Billed");
          }
          else {
            return callback("Billed but Failed to map!");
          }
        });
      }
      else{
        console.log(err);
        return callback("Not Billed!");
      }
    });
}
