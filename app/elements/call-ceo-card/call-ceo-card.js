var tableviewdata;
var tableviewdatafg;
  Polymer({
    is: 'call-ceo-card',
    handleResponse:function(e){
      this.newitems=e.detail.response.returnval;
      this.newitemsfg=e.detail.response.returnfg;
      tableviewdata=e.detail.response.returnval;
      tableviewdatafg=e.detail.response.returnfg;
    },
    opentableview:function(){
      document.querySelector("home-page").FnSetPage("table-view");
      document.querySelector("table-view").pggoods=tableviewdata;
      document.querySelector("table-view").tableheading1="Purchased Goods";
      document.querySelector("table-view").fggoods=tableviewdatafg;
      document.querySelector("table-view").tableheading2="Finished Goods";
    }
  });
