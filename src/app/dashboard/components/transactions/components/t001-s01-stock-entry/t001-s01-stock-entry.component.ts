import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockEntry } from '../../models/stockEntry';
import { Router } from '@angular/router';
import { StockEntryService } from '../../services/stockEntry.service';
import { RackTypes } from '../../models/RackTypes';
import { StorageLocation } from '../../models/StorageLocation';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-t001-s01-stock-entry',
  templateUrl: './t001-s01-stock-entry.component.html',
  styleUrls: ['./t001-s01-stock-entry.component.css']
})
export class T001S01StockEntryComponent implements OnInit {
  stockEntryForm: FormGroup;
  stockEntry: StockEntry = new StockEntry();
  rackTypes : RackTypes[];
  storageLocations : StorageLocation[];
  submitted = false;
  constructor(private router: Router, private fb: FormBuilder, private stockEntryService: StockEntryService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.stockEntryForm = this.fb.group({
     // plant: ['', [Validators.required]],
      sapLoc: ['', [Validators.required]],
      labelNr: ['', [Validators.required]],
      rackType: ['', [Validators.required]],
      rackId: ['', [Validators.required]],
      bin: ['', [Validators.required]],
      product: ['', [Validators.required]],
      qty: ['', [Validators.required]],
      contentStatus: ['', Validators.required]
    });
    this.GetRackTypes();
    this.GetStorageLocations();
    this.GetLabelValue();
  }

  onSubmit(){
    this.submitted = true;
    this.stockEntryForm.get('labelNr').setValue(this.stockEntryForm.get('labelNr').value.toString());
    this.stockEntryService.saveStockEntry(this.stockEntryForm.value).subscribe((data) => {
      this.toastr.success("Stock Entry Saved Successfully");
      setTimeout(function () {
        window.location.reload();
      }, 1000);
      //this.router.navigate(['transactions/stockentry']);
      //this.ngOnInit();
    });
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }

  GetRackTypes(){
    this.stockEntryService.getRackTypes().subscribe(data => {
      this.rackTypes=data;
      console.log(this.rackTypes);
    })
  }

  GetStorageLocations(){
    this.stockEntryService.getStorageLocations().subscribe(data => {
      this.storageLocations=data;
      console.log(this.storageLocations);
    })
  }

  GetLabelValue(){
    this.stockEntryService.getLabelValue().subscribe(res => {
      console.log(res);
      this.stockEntryForm.patchValue({
          labelNr: res,
      })
    });
  }
  

 AddNew(){
  //this.router.navigate(['/transactions/T001_S01_StockEntry']);
  window.location.reload();
 }

}


