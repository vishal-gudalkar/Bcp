import { Component, OnInit } from '@angular/core';
import { StockWms } from '../../models/stockWms';
import { StockWmsReportService } from '../../services/stockwmsReport.service';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-wms',
  templateUrl: './stock-wms.component.html',
  styleUrls: ['./stock-wms.component.css']
})
export class StockWmsComponent implements OnInit {
  stockWms : StockWms[];
  stockWmsSrch:StockWms=new StockWms();
  
  fileName= 'StockWms.xlsx';
  total=0;    
  constructor(private stockWmsReportService: StockWmsReportService,private router: Router,) { }

  ngOnInit(): void {
   this.GetStockWmsReport();
   this.stockWmsSrch.chckQty="A";
  }

  exportexcel(): void{
    /* pass here the table id */
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, this.fileName);
 
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

  findSumQuantity(data){      
    for(let j=0;j<data.length;j++){   
         this.total+= data[j].qty  
    }  
  }
  
  
  Back(){
    this.router.navigate(['/dashboard']);
  }
}
