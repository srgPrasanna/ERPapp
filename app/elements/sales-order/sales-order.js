(function() {
  'use strict';
    var item;
    var item1;
    var item2;
    var item5;
    var itemid;
    var customer_id="";
    var customer_name="";
    var customer_location="";
    var supplier_name="";
    var supplier_id="";
    var status="Projection";
    var status1="Order Placed";
    var autogenid;
    var pro="";
    var salesid="";
    var check;
  Polymer({
    is: 'sales-order',
        ready:function(){
        },
        checkid:function(e){
          check=e;
        },
        autocompletearr:function(e)
          {
            item=e.detail.response.returnval;
          },
          functionitem:function(){
            var obj={};
            obj.customerid=customer_id;
            this.writeparam=obj;
            this.urlname="http://localhost:4000/autocompleteitem";
            this.$.writeajax.generateRequest();
          },
          containerfunction:function()
          {
              var obj={};
              obj.itemid=supplier_id;
              this.containerparameter2=obj;
              this.containerrequesturl2="http://localhost:4000/containeridfetch2";
              this.$.containerajax2.generateRequest();
          },
          quantityfunction:function()
          {
            var obj={};
            obj.itemid=supplier_id;
            this.quantityparameter2=obj;
            this.quantityurl2="http://localhost:4000/quantityidfetch2";
            this.$.quantityajax2.generateRequest();
          },
          containerresponse2:function(e)
           {
              var containervalues1=e.detail.response.returnval;
              this.containeridvalue=e.detail.response.returnval[0].containername;
           },
           quantityresponse2:function(e)
           {
             var unitofmeasurevalues1=e.detail.response.returnval;
             this.qtyidvalue=e.detail.response.returnval[0].unitofmeasure_name;
           },

          functionlocation:function(){
            var obj={};
            obj.customerid=customer_id;
            this.locationparam=obj;
            this.urlname1="http://localhost:4000/autocompletelocation";
            this.$.locationajax.generateRequest();
          },
          autocompletearr1:function(e)
              {
                 item1=e.detail.response.returnval;
              },
              autocompletearr2:function(e)
                  {
                     item2=e.detail.response.returnval;
                     document.querySelector("sales-order").FnSearchEnquiry5();
                  },
                  autocompletearr5:function(e)
                      {
                         item5=e.detail.response.returnval;
                        //  alert("item5"+JSON.stringify(e.detail.response.returnval));
                      },

          //save

        saveitemsfn1:function(data){
            var obj={};
            obj.salesid=check;
            obj.customerid=customer_id;
            obj.id=supplier_id;
            obj.description=this.idescription;
            obj.ispecification=this.ispecification;
            obj.rcoilsq=this.rcoils;
            obj.rtonq=this.rtons;
            obj.rdqty=this.dqty;
            obj.status=status1;
            obj.datetimeq=this.min;
            obj.datetimeq1=this.min1;
            this.writeparam=obj;
            this.$.insertajax.generateRequest();
            document.querySelector("home-page").FnSetPage("sales-order");
          },
        salesResponse:function(e){
          // alert("ok");
            alert(e.detail.response.returnval);
        },

 //autocomplete-input
        FnSearchEnquiry:function(e){
        if(e.keyCode==13|| e.keyCode==40)
      this.querySelector('#transportinput2').focus();
      var arr=[];
      arr.push({"itemdes":"-----Select-----"});
      this.querySelector('#transportinput2').style.visibility='visible';
      if(e.keyCode==8){
        this.itemflag="true";
        this.itemval="";
        var len=(this.value).length;
        if(len<=1){
          this.querySelector('#transportinput2').style.visibility='hidden';
          this.itemArray="";
          this.itemval="";
        }
        if(len>1){
          this.querySelector('#transportinput2').style.visibility='visible';
          var backsubval=(((this.value).substring(0,(len-1))).trim()).toUpperCase();
          for(var i=0;i<item.length;i++)
          {
            var subval=((item[i].customername).trim()).substring(0,backsubval.length);
            if((item[i].customername).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
            {
              var obj={"itemdes":"","enquiry_no":""};
              obj.itemdes=item[i].customername;
              obj.customerid=item[i].customerid;
              arr.push(obj);
            }
          }
          this.itemArray=arr;
        }
      }
      if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
        if(this.itemflag=="true") {
          this.itemval = (this.value).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
          this.itemflag="false";
        }
        else
        this.itemval = this.value +String.fromCharCode((e.keyCode));
        if(this.itemval.length>0)
        {
          for(var i=0;i<item.length;i++)
          {
            var subval=((item[i].customername).trim()).substring(0,this.itemval.length);
            if((item[i].customername).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
            {
              var obj={"itemdes":"","enquiry_no":""};
              obj.itemdes=item[i].customername;
              obj.customerid=item[i].customerid;
              arr.push(obj);
            }
          }
          if(arr.length>0)
            this.itemArray=arr;
          else
          {
            var obj={"itemdes":"","enquiry_no":""};
            obj.itemdes="No items found";
            arr.push(obj);
            this.itemArray=arr;
          }
        }
      }

          },


          FnSelectEnquiry1:function(e){
              this.querySelector('#transportinput2').style.visibility='hidden';
              customer_name = e.target.selectedItem.textContent.trim();
              customer_id = e.target.selectedItem.value.trim();
              this.itemArray=[];
              document.querySelector('#transportinput2').selected=-1;
              this.value=customer_name;
              // alert(customer_id);
              sessionStorage.setItem('customerid1',customer_id);
              // document.querySelector('home-page').FnSetPage('sales-order');
      },

      //auto complete itemname
              //backspace item display
          FnSearchEnquiry1:function(e){
            if(e.keyCode==13|| e.keyCode==40)
            this.querySelector('#transportinput3').focus();
            var arr=[];
            arr.push({"itemdes1":"-----Select-----"});
            this.querySelector('#transportinput3').style.visibility='visible';
            if(e.keyCode==8){
              this.itemflag1="true";
              this.itemval1="";
              var len=(this.value1).length;
              if(len<=1){
                this.querySelector('#transportinput3').style.visibility='hidden';
                this.itemArray1="";
                this.itemval1="";
              }
              if(len>1){
                this.querySelector('#transportinput3').style.visibility='visible';
                var backsubval=(((this.value1).substring(0,(len-1))).trim()).toUpperCase();
                for(var i=0;i<item1.length;i++)
                {
                  var subval=((item1[i].itemname).trim()).substring(0,backsubval.length);
                  if((item1[i].itemname).toUpperCase().indexOf((this.value1).toUpperCase())!=-1)
                  {
                    var obj1={"itemdes1":"","enquiry_no":""};
                    obj1.itemdes1=item1[i].itemname;
                    obj1.itemid=item1[i].itemid;
                    arr.push(obj1);
                  }
                }
                this.itemArray1=arr;
              }
            }
            if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
              if(this.itemflag1=="true") {
                this.itemval1 = (this.value1).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
                this.itemflag1="false";
              }
              else
              this.itemval1 = this.value1 +String.fromCharCode((e.keyCode));
              if(this.itemval1.length>0)
              {
                for(var i=0;i<item1.length;i++)
                {
                  var subval=((item1[i].itemname).trim()).substring(0,this.itemval1.length);
                  if((item1[i].itemname).toUpperCase().indexOf((this.itemval1).toUpperCase())!=-1)
                  {
                    var obj1={"itemdes1":"","enquiry_no":""};
                    obj1.itemdes1=item1[i].itemname;
                    obj1.itemid=item1[i].itemid;
                    arr.push(obj1);
                  }
                }
                if(arr.length>0)
                  this.itemArray1=arr;
                else
                {
                  var obj1={"itemdes1":"","enquiry_no":""};
                  obj.itemdes1="No items found";
                  arr.push(obj1);
                  this.itemArray1=arr;
                }
              }
            }


            },
            //customerid

            FnSelectEnquiry2:function(e){
            this.querySelector('#transportinput3').style.visibility='hidden';
            supplier_name = e.target.selectedItem.textContent.trim();
            supplier_id = e.target.selectedItem.value.trim();
            this.itemArray1=[];
            document.querySelector('#transportinput3').selected=-1;
            this.value1=supplier_name;
          },

          //auto complete location
          locationkey:function(e){
            if(e.keyCode==13|| e.keyCode==40)
              this.querySelector('#locationid').focus();
              var arr=[];
              arr.push({"itemdes5":"-----Select-----"});
              this.querySelector('#locationid').style.visibility='visible';
              if(e.keyCode==8){
                this.itemflag5="true";
                this.itemval5="";
                var len=(this.value5).length;
                if(len<=1){
                  this.querySelector('#locationid').style.visibility='hidden';
                  this.itemArray5="";
                  this.itemval5="";
                }
                if(len>1){
                  this.querySelector('#locationid').style.visibility='visible';
                  var backsubval=(((this.value5).substring(0,(len-1))).trim()).toUpperCase();
                  for(var i=0;i<item5.length;i++)
                  {
                    var subval=((item5[i].city).trim()).substring(0,backsubval.length);
                    if((item5[i].city).toUpperCase().indexOf((this.value5).toUpperCase())!=-1)
                    {
                      var obj5={"itemdes5":"","enquiry_no":""};
                      obj5.itemdes5=item5[i].city;
                      // obj5.itemid=item5[i].itemid;
                      arr.push(obj5);
                    }
                  }
                  this.itemArray5=arr;
                }
              }
              if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39){
                if(this.itemflag5=="true") {
                  this.itemval5 = (this.value5).toUpperCase()+String.fromCharCode((e.keyCode)).toUpperCase();
                  this.itemflag5="false";
                }
                else
                this.itemval5 = this.value5 +String.fromCharCode((e.keyCode));
                if(this.itemval5.length>0)
                {
                  for(var i=0;i<item5.length;i++)
                  {
                    var subval=((item5[i].city).trim()).substring(0,this.itemval5.length);
                    if((item5[i].city).toUpperCase().indexOf((this.itemval5).toUpperCase())!=-1)
                    {
                      var obj5={"itemdes5":"","enquiry_no":""};
                      obj5.itemdes5=item5[i].city;
                      // obj5.itemid=item5[i].itemid;
                      arr.push(obj5);
                    }
                  }
                  if(arr.length>0)
                    this.itemArray5=arr;
                  else
                  {
                    var obj5={"itemdes5":"","enquiry_no":""};
                    obj.itemdes5="No items found";
                    arr.push(obj5);
                    this.itemArray5=arr;
                  }
                }
              }


            },

            locationlistbox:function(e){
            this.querySelector('#locationid').style.visibility='hidden';
            var student_name = e.target.selectedItem.textContent.trim();
            localStorage.setItem("curr_sess_studentname",student_name);
            this.itemArray5=[];
            document.querySelector('#locationid').selected=-1;
            this.value5=student_name;
            }
  });
})();
