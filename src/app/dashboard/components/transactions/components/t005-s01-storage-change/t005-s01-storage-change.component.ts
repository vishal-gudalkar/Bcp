import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/constant/constant';
import { StockChangeService } from '../../services/stockChange.service';

@Component({
  selector: 'app-t005-s01-storage-change',
  templateUrl: './t005-s01-storage-change.component.html',
  styleUrls: ['./t005-s01-storage-change.component.css']
})
export class T005S1StorageChangeComponent implements OnInit {

  storageChangeForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService,private router: Router,private stockChangeService: StockChangeService) { }

  ngOnInit(): void {
    this.storageChangeForm = this.fb.group({
      labelNr: ['', ''],
      rackId: ['', ''],
      feildChangeType:Constant.StockChangeField.Storage,
      sapLoc: ['', [Validators.required]]
    });
  }

  refreshForm():void{
    this.storageChangeForm.reset();
  }

  onSubmit(){
    if(this.storageChangeForm.get('labelNr').value=="" && this.storageChangeForm.get('rackId').value==""){
      this.toastr.error("Enter either Lable or Rack Id");
      return;
    }
    this.stockChangeService.saveStockChange(this.storageChangeForm.value).subscribe((data) => {
      if(data==Constant.ApiResult.Success){
        this.storageChangeForm.reset();
      this.toastr.success("Stock Storage Changed Successfully");
      }
      else if(data==Constant.ApiResult.NotFound)
      this.toastr.warning("Stock not found for given Label or Rack Id");

    });
  }


  onCancel(){
    this.router.navigate(['/dashboard']);
  }

}
