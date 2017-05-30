(function() {
  'use strict';
  Polymer({
    is: 'vehicle-in-process-invoiceno',
   invoiceprocess:function(){
     var invoiceno1=this.invoicevalue;
     var invoicedate=this.invoicedatevalue;
     document.querySelector("vehicle-in-process-itemdetails").invoiceprocessback(invoiceno1,invoicedate);
   },
   invoicelabelinfo:function(e){
     var jsonlabel=this.jsondata;
     this.invoiceno=jsonlabel[0].invoiceno;
     this.Invoicedate=jsonlabel[0].invoicedate;
   }

  });
})();
