import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StockEntry,StockChange } from '../models/stockEntry';

@Injectable({
    providedIn: 'root'
  })
  export class StockChangeService {

    constructor(private http: HttpClient) { }



    saveStockChange(changes:StockChange){
      return this.http.post(environment.apiUrl + 'StockChanges/update', changes);
    }

  }
