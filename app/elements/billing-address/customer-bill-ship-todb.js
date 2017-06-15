exports.insertcustomerbill=function(details,callback){
  var response={"billing_id":details.billid,
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
        connection.query('insert into od_customer_bill_mapping (customer_id,billing_id) values ("'+details.billcustomerid+'","'+details.billid+'");',function(err,billmapstatus){
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

exports.insertcustomership=function(details,callback){
  if(details.copyBillAddress==1){
  var response={"shipping_id":details.shipid,
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
        connection.query('insert into od_customer_ship_mapping (customer_id,shipping_id) values ("'+details.shipname+'","'+details.shipid+'");',function(err,shipmapstatus){
          if(shipmapstatus.affectedRows>0){
            return callback("Shipped");
          }
          else {
            return callback("Shipped but Failed to map!");
          }
        });
      }
      else{
        console.log(err);
        return callback("Not Shipped!");
      }
    });
  }
  else {
    connection.query('select * from md_sales_customer_detail where customer_name="'+details.shipname+'"',function(err,customerdetails){
      var response={"shipping_id":details.shipid,
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
            connection.query('insert into od_customer_ship_mapping (customer_id,shipping_id) values ("'+customerdetails[0].customer_id+'","'+details.shipid+'");',[response],function(err,shipmapstatus){
              if(shipmapstatus.affectedRows>0){
                return callback("Shipped");
              }
              else {
                return callback("Shipped but Failed to map!");
              }
            });
          }
          else{
            console.log(err);
            return callback("Not Shipped!");
          }
        });
    });
  }
}

exports.searchcustomerbills=function(details,callback){
    connection.query('select t1.*,t2.*,t3.*,t4.* from md_sales_customer_detail as t1 left join od_sales_customer_billing_address_details as t2 on t2.customer_id=t1.customer_id left join md_country as t3 on t3.country_id=t2.country_code left join md_state as t4 on t4.state_id=t2.state_code and t4.country_id=t2.country_code where t1.customer_name="'+details.searchcustomername+'";',function(err,data){
      if(data.length>0){
        return callback(data);
        }
      else{
        console.log(err);
        return callback("No Billing Address found!");
        }
    });
}

exports.searchcustomership=function(details,callback){
    connection.query('select t1.*,t2.*,t3.*,t4.* from md_sales_customer_detail as t1 left join od_sales_customer_shipping_address_details as t2 on t2.customer_id=t1.customer_id left join md_country as t3 on t3.country_id=t2.country_code left join md_state as t4 on t4.state_id=t2.state_code and t4.country_id=t2.country_code where t1.customer_name="'+details.searchshipcustomername+'";',function(err,data){
      if(data.length>0){
        return callback(data);
        }
      else{
        console.log(err);
        return callback("No Shipping Address found!");
        }
    });
}
