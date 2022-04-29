import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { StockChangeService } from '../../services/stockChange.service';
import { Constant } from 'src/app/constant/constant';
@Component({
  selector: 'app-t003-s01-bin-change',
  templateUrl: './t003-s01-bin-change.component.html',
  styleUrls: ['./t003-s01-bin-change.component.css']
})
export class T003S01BinChangeComponent implements OnInit {

  binChangeForm: FormGroup;


  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService,private changeServe: StockChangeService) { }

  ngOnInit(): void {
    this.binChangeForm = this.fb.group({
      labelNr: ['', ''],
      rackId: ['', ''],
      feildChangeType:Constant.StockChangeField.Bin,
      bin: ['', [Validators.required]]
    });

  }
  refreshForm():void{
    this.binChangeForm.reset();
  }


  onSubmit(){
    if(this.binChangeForm.get('labelNr').value=="" && this.binChangeForm.get('rackId').value==""){
      this.toastr.error("Enter either Lable or Rack Id");
      return;
    }
    this.changeServe.saveStockChange(this.binChangeForm.value).subscribe((data) => {
      if(data==Constant.ApiResult.Success){
        this.binChangeForm.reset();
      this.toastr.success("Stock Bin Changed Successfully");
      }
      else if(data==Constant.ApiResult.NotFound)
      this.toastr.warning("Stock not found for given Label or Rack Id");

    });
  }

  onCancel(){
    this.router.navigate(['/dashboard']);
  }

}
