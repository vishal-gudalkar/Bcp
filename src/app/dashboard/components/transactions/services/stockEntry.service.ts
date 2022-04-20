import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { RackTypes } from 'src/app/dashboard/components/transactions/models/RackTypes';
import { StorageLocation } from 'src/app/dashboard/components/transactions/models/StorageLocation';
import { StockEntry } from '../models/stockEntry';

@Injectable({
    providedIn: 'root'
  })
  export class StockEntryService {
    
    constructor(private http: HttpClient) { }

    getLabelValue(){
        return this.http.get<any>(environment.apiUrl + 'StockEntry/GetLabelValue');
    }


    getRackTypes(): Observable<RackTypes[]> {
      return this.http.get<RackTypes[]>(environment.apiUrl + 'StockEntry/RackTypes');
    }

    getStorageLocations():Observable<StorageLocation[]> {
      return this.http.get<StorageLocation[]>(environment.apiUrl + 'StockEntry/StorageLocations');
    }

    saveStockEntry(stockEntry: StockEntry) {
      return this.http.post(environment.apiUrl + 'StockEntry/SaveStockEntry', stockEntry);
    }
  
  }
  