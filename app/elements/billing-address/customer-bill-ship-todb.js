exports.insertcustomerbill=function(details,callback){
  var response={"customer_id":details.billcustomerid,
                "customer_email":details.billemail,
                "country_code":details.billcountry,
                "state_code":details.billstate,
                "city_name":details.billcity,
                "street_name":details.billstreet,
                "pincode":details.billpincodeno,
                "mobile_number":details.billmobile
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
  if(details.copyBillAddress==1){
  var response={"customer_id":details.shipname,
                "customer_email":details.shipemail,
                "country_code":details.shipcountry,
                "state_code":details.shipstate,
                "city_name":details.shipcity,
                "street_name":details.shipstreet,
                "pincode":details.shippincodeno,
                "mobile_number":details.shipmobile
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
  else {
    connection.query('select * from md_sales_customer_detail where customer_name="'+details.shipname+'"',function(err,customerdetails){
      var response={"customer_id":customerdetails[0].customer_id,
                    "customer_email":details.shipemail,
                    "country_code":details.shipcountry,
                    "state_code":details.shipstate,
                    "city_name":details.shipcity,
                    "street_name":details.shipstreet,
                    "pincode":details.shippincodeno,
                    "mobile_number":details.shipmobile
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
    });
  }
}
