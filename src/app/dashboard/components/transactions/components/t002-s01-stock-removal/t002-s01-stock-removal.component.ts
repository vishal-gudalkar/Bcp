import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { StockEntry } from '../../models/stockEntry';
import { StorageLocation } from '../../models/StorageLocation';
import { StockEntryService } from '../../services/stockEntry.service';
import { StockRemovalService } from '../../services/stockRemoval.service';

@Component({
  selector: 'app-t002-s01-stock-removal',
  templateUrl: './t002-s01-stock-removal.component.html',
  styleUrls: ['./t002-s01-stock-removal.component.css']
})
export class T002S01StockRemovalComponent implements OnInit {
  stockRemovalForm: FormGroup;
  stockEntry: StockEntry = new StockEntry();
  storageLocations : StorageLocation[];
  submitted = false;
  constructor(private router: Router, private fb: FormBuilder,private stockEntryService: StockEntryService,private stockRemovalService:StockRemovalService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.stockRemovalForm = this.fb.group({
      plant: ['', [Validators.required]],
      sapLoc: ['', [Validators.required]],
      labelNr: ['', [Validators.required]],
      product: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      delivery: ['', [Validators.required]],
    });
    this.GetStorageLocations();
  }

  onSubmit(){
    this.submitted = true;
    this.stockRemovalService.saveUpdateStockRemoval(this.stockRemovalForm.value).subscribe(data => {
      this.toastr.success("Stock Removal Saved Successfully");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    },
    
    );
  }
  onCancel(){
    this.router.navigate(['/dashboard']);
  }
  GetStorageLocations(){
    this.stockEntryService.getStorageLocations().subscribe(data => {
      this.storageLocations=data;
    })
  }
 AddNew(){
    window.location.reload();
 }

}



