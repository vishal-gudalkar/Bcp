import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';


@Injectable({
    providedIn: 'root'
  })
  export class CommonReportService {
    
    constructor(private http: HttpClient) { }

    exportExcel(data: any, fileName: string, isHtml: boolean = false) {
      if (isHtml === false) {
        let workbook = new Workbook();
        let worksheet = workbook.addWorksheet('Data');
        let headerRow = worksheet.addRow(Object.keys(data[0]));
        headerRow.eachCell((cell, number) => {
          cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '4167B8' }, bgColor: { argb: '' } }
          cell.font = { bold: true, color: { argb: 'FFFFFF' }, size: 12 }
        })
        data.forEach((row: any) => {
          worksheet.addRow(Object.values(row))
        })
        workbook.xlsx.writeBuffer().then((data) => {
          let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          saveAs(blob, fileName + '.xlsx');
        })
      }
      else {
        var blob = new Blob([data], { type: "application/vnd.ms-excel" });
        saveAs(blob, fileName + '.xls');
      }
    }
  
  }
  