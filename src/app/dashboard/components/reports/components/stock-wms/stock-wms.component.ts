import { Component, OnInit, ViewChild } from '@angular/core';
import { StockWms } from '../../models/stockWms';
import { StockWmsReportService } from '../../services/stockwmsReport.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { CommonReportService } from '../../services/commonReport.service';
import { List } from 'linqts';
import { ToastrService } from 'ngx-toastr';
import { LazyLoadEvent } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-stock-wms',
  templateUrl: './stock-wms.component.html',
  styleUrls: ['./stock-wms.component.css']
})
export class StockWmsComponent implements OnInit {
  stockWms : StockWms[];
  stockWmsExportList : StockWms[];
  virtualDatabase: StockWms[];
  stockWmsSrch:StockWms=new StockWms();
  fileName= 'StockWms.xlsx';
  total=0;  
  totalRecords: number;
  @ViewChild('dt') dataTable: Table;
  displayedColumns = ['bin', 'prodAdd', 'labelNr', 'qty'];
  cols = [
    { field: 'bin', header: 'BIN' },    
    { field: 'prodAdd', header: 'PROD_ADD' },
    { field: 'labelNr', header: 'LABEL_NR' },
    { field: 'rackType', header: 'RACK_TYPE' },
    { field: 'rackId', header: 'RACK_ID' },
    { field: 'serialNr', header: 'SERIAL_NR' },
    { field: 'batchNr', header: 'BATCH_NR' },
    { field: 'matType', header: 'MAT_TYPE' },
    { field: 'product', header: 'PRODUCT' },
    { field: 'prNetWeight', header: 'PID' },
    { field: 'contentStatus', header: 'CONTENT_STATUS' },
    { field: 'qty', header: 'QTY' },
    { field: 'prodDsc2', header: 'PROD_DSC2' },
    { field: 'sapLoc', header: 'SAP_LOC' },
    { field: 'market', header: 'MARKET' },
    { field: 'plant', header: 'PLANT' },
    { field: 'delivery', header: 'DELIVERY' },
    { field: 'dryDate', header: 'DRY_DATE' },
   ];
  constructor(private stockWmsReportService: StockWmsReportService,private router: Router,private commonService:CommonReportService,private toastr: ToastrService) { }

  ngOnInit(): void {
   this.GetStockWmsReport();
   this.stockWmsSrch.chckQty="A";
  }

  GetStockWmsReport(){
    this.stockWmsReportService.getStockWmsReport(this.stockWmsSrch).subscribe(data => {
      this.stockWms=data;
      this.total=0;
      if(this.stockWms!=null && this.stockWms.length>0){
        var data1 =this.stockWms.slice(0, 10);
        this.findSumQuantity(data1); 
      }
    })
  }
  exportexcel(): void{
    this.stockWmsReportService.getStockWmsExcelExportData().subscribe(data => {
      this.stockWmsExportList=data;
      if(this.stockWmsExportList!=null && this.stockWmsExportList.length>0){
        var stockwmsData = new List<any>(this.stockWmsExportList).Select((x: StockWms) => (
          {
            'BIN': x.bin, 'PROD_ADD	': x.prodAdd, 'LABEL_NR': x.labelNr, 'RACK_TYPE': x.rackType, 'RACK_ID': x.rackId, 'SERIAL_NR': x.serialNr, 'BATCH_NR': x.batchNr, 'MAT TYPE': x.matType, 'PRODUCT': x.product,
            'PID'	:x.prNetWeight,'CONTENT_STATUS':x.contentStatus,'QTY':x.qty,'PROD_DSC2'	:x.prodDsc2,'SAP_LOC':x.sapLoc,	'MARKET':x.market,'PLANT':x.plant,'DELIVERY':x.delivery,'DRY_DATE':x.dryDate
          })).ToArray();
          this.commonService.exportExcel(stockwmsData, "StockWmsReport");
      }else{
        this.toastr.info("No Records For Excel to Export");
      }
     
    })
  }
  
  findSumQuantity(data){     
    var data1 =data.slice(0, 10);
    this.total=0;
    for(let j=0;j<data1.length;j++){   
         this.total+= data[j].qty  
    }  
  }
  
  paginate(data){

    this.findSumQuantity(this.stockWms);
    let pageIndex = data.first/data.rows + 1
    console.log(pageIndex);
  }


  Back(){
    this.router.navigate(['/dashboard']);
  }

  Reset(report :NgForm){
    report.reset();
    this.GetStockWmsReport();
  }

  setCurrentPage(n: number) {
    this.dataTable.reset();
    let paging = {
        first: ((n - 1) * this.dataTable.rows),
        rows: this.dataTable.rows
    };
    //this.dataTable.onPage();
}
}
