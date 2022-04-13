import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StockEntry } from '../../models/stockEntry';
import { Router } from '@angular/router';
import { StockEntryService } from '../../services/stockEntry.service';

@Component({
  selector: 'app-t001-s01-stock-entry',
  templateUrl: './t001-s01-stock-entry.component.html',
  styleUrls: ['./t001-s01-stock-entry.component.css']
})
export class T001S01StockEntryComponent implements OnInit {
  stockEntryForm: FormGroup;
  stockEntry: StockEntry = new StockEntry();
  stockEntryNext1: boolean = false;
  stockEntryNext2: boolean = false;
  stockEntryNext3: boolean = false;
  constructor(private router: Router, private fb: FormBuilder, private stockEntryService: StockEntryService) { }

  ngOnInit(): void {
    this.stockEntryForm = this.fb.group({
      plant: ['', [Validators.required]],
      location: ['', [Validators.required]],
      stockEntryGrp1: this.fb.group({
        label: ['', [Validators.required]],
        rackType: ['', [Validators.required]],
        rackId: ['', [Validators.required]],
        bin: ['', [Validators.required]]
      }),
      stockEntryGrp2: this.fb.group({
        material: ['', [Validators.required]],
        qty: ['', [Validators.required]],
        status: ['', Validators.required]
      })
    });
  }

  onSubmit(){

  }

  onNext1(){
    const plantControl = this.stockEntryForm.get('plant');
    const locationControl = this.stockEntryForm.get('location');
    
    if(plantControl.valid && locationControl.valid){
      this.stockEntryNext1 = true;      
      this.stockEntryService.getLabelValue().subscribe(res => {
        this.stockEntryForm.patchValue({
          stockEntryGrp1:{
            label: res
          } 
        })
      })
      
      plantControl.clearValidators();
      locationControl.clearValidators();
    }
    else if(!plantControl.valid){
      plantControl.setValidators(Validators.required);
    }
    else if(!locationControl.valid){
      locationControl.setValidators(Validators.required);
    }
    plantControl.updateValueAndValidity();
    locationControl.updateValueAndValidity();
  }

  onNext2(){
    if(!this.stockEntryNext2){
      const rackTypeControl = this.stockEntryForm.get('stockEntryGrp1.rackType');
      const rackIdControl = this.stockEntryForm.get('stockEntryGrp1.rackId');
      const binControl = this.stockEntryForm.get('stockEntryGrp1.bin');
      if(rackTypeControl.valid && rackIdControl.valid && binControl.valid){
        this.stockEntryNext2 = true;
        //fetch label id code to do 
        rackTypeControl.clearValidators();
        rackIdControl.clearValidators();
        binControl.clearValidators();
      }
      else if(!rackTypeControl.valid){
        rackTypeControl.setValidators(Validators.required);
      }
      else if(!rackIdControl.valid){
        rackIdControl.setValidators(Validators.required);
      }
      else if(!binControl.valid){
        binControl.setValidators(Validators.required);
      }
      rackTypeControl.updateValueAndValidity();
      rackIdControl.updateValueAndValidity();
      binControl.updateValueAndValidity();
    }
    else{
      const materialControl = this.stockEntryForm.get('stockEntryGrp2.material');
      const qtyControl = this.stockEntryForm.get('stockEntryGrp2.qty');
      const statusControl = this.stockEntryForm.get('stockEntryGrp2.status');
      if(materialControl.valid && qtyControl.valid && statusControl.valid){
        this.stockEntryNext3 = true;
        //fetch label id code to do 
        materialControl.clearValidators();
        qtyControl.clearValidators();
        statusControl.clearValidators();
      }
      else if(!materialControl.valid){
        materialControl.setValidators(Validators.required);
      }
      else if(!qtyControl.valid){
        qtyControl.setValidators(Validators.required);
      }
      else if(!statusControl.valid){
        statusControl.setValidators(Validators.required);
      }
      materialControl.updateValueAndValidity();
      qtyControl.updateValueAndValidity();
      statusControl.updateValueAndValidity();
    }
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }

}


