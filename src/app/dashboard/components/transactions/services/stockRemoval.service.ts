import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StockEntry } from '../models/stockEntry';

@Injectable({
    providedIn: 'root'
  })
  export class StockRemovalService {
    
    constructor(private http: HttpClient) { }

    saveUpdateStockRemoval(stockEntry: StockEntry) {
      return this.http.post(environment.apiUrl + 'StockRemoval/SaveUpdateStockRemoval', stockEntry);
    }
  
  }
  