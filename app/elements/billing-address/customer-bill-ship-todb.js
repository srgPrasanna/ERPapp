exports.insertcustomerbill=function(details,callback){
  var response={"customer_id":details.customerid,
                "country_code":details.billcountry,
                "state_code":details.billstate,
                "city_name":details.billcity,
                "street_name":details.billstreet,
                "pincode":details.billpincodeno
              };
    connection.query("insert into od_sales_customer_billing_address_details set ?",[response],function(err,billingstatus){
      if(billingstatus.affectedRows>0){
          return callback("Billed");
      }
      else{
        console.log(err);
        return callback("Not Billed!");
      }
    });
}

exports.insertcustomership=function(details,callback){
  var response={"country_code":details.shipcountry,
                "state_code":details.shipstate,
                "city_name":details.shipcity,
                "street_name":details.shipstreet,
                "pincode":details.shippincodeno
              };
    connection.query("insert into od_sales_customer_shipping_address_details set ?",[response],function(err,shippingstatus){
      if(shippingstatus.affectedRows>0){
          return callback("Shipped");
      }
      else{
        console.log(err);
        return callback("Not Shipped!");
      }
    });
}
