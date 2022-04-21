import { Component, OnInit } from '@angular/core';
import { StockWms } from '../../models/stockWms';
import { StockWmsReportService } from '../../services/stockwmsReport.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { CommonReportService } from '../../services/commonReport.service';
import { List } from 'linqts';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-stock-wms',
  templateUrl: './stock-wms.component.html',
  styleUrls: ['./stock-wms.component.css']
})
export class StockWmsComponent implements OnInit {
  stockWms : StockWms[];
  stockWmsExportList : StockWms[];
  stockWmsSrch:StockWms=new StockWms();
  
  fileName= 'StockWms.xlsx';
  total=0;  
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
        this.findSumQuantity(this.stockWms); 
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
    for(let j=0;j<data.length;j++){   
         this.total+= data[j].qty  
    }  
  }
  
  
  Back(){
    this.router.navigate(['/dashboard']);
  }
}
