import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StockEntry } from '../models/stockEntry';

@Injectable({
    providedIn: 'root'
  })
  export class changeService {
    
    constructor(private http: HttpClient) { }

    saveBinChange(binChanges: StockEntry) {
      return this.http.post(environment.apiUrl + 'BinChange/SaveBinChanges', binChanges);
    }
  
  }
  