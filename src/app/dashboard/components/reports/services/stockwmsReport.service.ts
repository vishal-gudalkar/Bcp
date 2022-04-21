import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class StockWmsReportService {
    
    constructor(private http: HttpClient) { }

    getStockWmsReport(searchStockWms:any): Observable<any[]> {
        return this.http.post<any[]>(environment.apiUrl + 'StockWmsReport/GetStockWmsReportDetails',searchStockWms);
    }

    getStockWmsExcelExportData(): Observable<any[]> {
      return this.http.get<any[]>(environment.apiUrl + 'StockWmsReport/StockWmsExcelExportData');
    }
  }
  