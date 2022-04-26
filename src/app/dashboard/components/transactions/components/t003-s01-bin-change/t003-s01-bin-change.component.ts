import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { plantConfig } from 'src/app/dashboard/config/commonConfig';
import { StockEntry } from '../../models/stockEntry';
import { Router } from '@angular/router';
import { changeService } from '../../services/change.service';
@Component({
  selector: 'app-t003-s01-bin-change',
  templateUrl: './t003-s01-bin-change.component.html',
  styleUrls: ['./t003-s01-bin-change.component.css']
})
export class T003S01BinChangeComponent implements OnInit {

  binChangeForm: FormGroup;
  stockEntry: StockEntry = new StockEntry();
  submitted = false;
  isAny=false;
  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,private changeServe: changeService) { }

  ngOnInit(): void {
    this.isAny=false;
    this.binChangeForm = this.fb.group({
      plant: ['', ''],
      labelNr: ['', ''],
      rackId: ['', ''],
      bin: ['', [Validators.required]]
    });
   
  }

  onSubmit(){
    this.submitted = true;
    this.binChangeForm.get('plant').setValue(plantConfig.plant);
    if(!this.binChangeForm.get('labelNr').value && !this.binChangeForm.get('rackId').value){
      //alert("Enter any one value");
      this.isAny=true;
      return;
    }
    this.changeServe.saveBinChange(this.binChangeForm.value).subscribe((data) => {
      this.toastr.success("Bin Changes Saved Successfully");
      this.binChangeForm.reset();
    });
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }
 AddNew(){
  this.ngOnInit();
 }
}
