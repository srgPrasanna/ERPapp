(function() {
  'use strict';
  var item="";
  var supplier_id="";
  var supplier_name="";
  var supplierid1="";
  // sessionStorage.setItem("suppliername1",supplier_name);
  // sessionStorage.setItem("supplierid1",supplier_id);
  // alert(suppliername1);
  Polymer({
    is: 'vehicle-in-process-suppliername',
    supplierautocompletefunction:function(e)
        {
          item=e.detail.response.returnval;
          // var supplierid=item[0].supplierid;
          // alert(JSON.stringify(supplierid));
          // alert(JSON.stringify(item));
        },
        //backspace item display
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
              var subval=((item[i].suppliername).trim()).substring(0,backsubval.length);
              if((item[i].suppliername).toUpperCase().indexOf((this.value).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};;

                obj.itemdes=item[i].suppliername;
                obj.supplierid=item[i].supplierid;
                // var obj1={"itemdes":obj.suppliername};

                arr.push(obj);
              }
            }
            this.itemArray=arr;
          }
        }

        //while typing item display
        if(e.keyCode!=8&& e.keyCode!=16&& e.keyCode!=13 && e.keyCode!=38&&e.keyCode!=40&&e.keyCode!=37&&e.keyCode!=39)
        {
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
              var subval=((item[i].suppliername).trim()).substring(0,this.itemval.length);
             if(this.itemval == subval)
             {
              if((item[i].suppliername).toUpperCase().indexOf((this.itemval).toUpperCase())!=-1)
              {
                var obj={"itemdes":""};
                obj.itemdes=item[i].suppliername;
                obj.supplierid=item[i].supplierid;
                // var obj1={"itemdes":obj.suppliername};
                arr.push(obj);
              }
            }
            }
            if(arr.length>0)
              this.itemArray=arr;
            else
            {
              var obj={"itemdes":"No items found"};
              obj.itemdes;
              arr.push(obj);
              this.itemArray=arr;
            }
          }
        }
      },

      FnSelectEnquiry1:function(e){
      this.querySelector('#transportinput2').style.visibility='hidden';
      // var student_name = e.target.selectedItem.textContent.trim();
      // localStorage.setItem("curr_sess_studentname",student_name);
      supplier_name = e.target.selectedItem.textContent.trim();
      supplier_id = e.target.selectedItem.value.trim();
      sessionStorage.setItem("suppliername1",supplier_name);
      sessionStorage.setItem("supplierid1",supplier_id);
      alert(supplier_id+"  "+supplier_name);
      this.itemArray=[];
      document.querySelector('#transportinput2').selected=-1;
      this.value=supplier_name;

    },
    supplierautocomplete:function(){
       document.querySelector("vehicle-in-process-itemdetails").supplierprocessback(supplier_id);
    },
    supplierlabelinfo:function(e){
      var jsonlabel=this.jsondata;
      alert(jsonlabel[0].suppliername);
      this.Suppliername=jsonlabel[0].suppliername;
    }



          });
})();
