import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constant } from 'src/app/constant/constant';
import { StockChangeService } from '../../services/stockChange.service';

@Component({
  selector: 'app-t004-s01-status-change',
  templateUrl: './t004-s01-status-change.component.html',
  styleUrls: ['./t004-s01-status-change.component.css']
})
export class T004S01StatusChangeComponent implements OnInit {
  statusChangeForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService,private router: Router,private stockChangeServe: StockChangeService) { }

  ngOnInit(): void {
    this.statusChangeForm = this.fb.group({
      labelNr: ['', ''],
      rackId: ['', ''],
      feildChangeType:Constant.StockChangeField.Status,
      status: [null, [Validators.required]]
    });
  }

  refreshForm():void{
    this.statusChangeForm.reset();
  }

  onSubmit(){
    if(this.statusChangeForm.get('labelNr').value=="" && this.statusChangeForm.get('rackId').value==""){
      this.toastr.error("Enter either Lable or Rack Id");
      return;
    }
    this.stockChangeServe.saveStockChange(this.statusChangeForm.value).subscribe((data) => {
      if(data==Constant.ApiResult.Success){
        this.statusChangeForm.reset();
      this.toastr.success("Status Changed Successfully");
      }
      else if(data==Constant.ApiResult.NotFound)
      this.toastr.warning("Stock not found for given Label or Rack Id");

    });
  }


  onCancel(){
    this.router.navigate(['/dashboard']);
  }

}
