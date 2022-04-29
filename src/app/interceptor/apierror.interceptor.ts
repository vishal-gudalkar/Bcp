//#region Imports
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class APIErrorInterceptor implements HttpInterceptor {
  constructor(
    private spinner: NgxSpinnerService,
    private toaster: ToastrService,
    private router: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.status === 401){
          this.router.navigate(["/login"]);
        } else if (error.status === 409) {
          this.toaster.warning('Record Not Exists', 'Warning');
        } else {
          this.toaster.error('Some thing went wrong', 'Error');
        }

        this.spinner.hide();
        return throwError(() => new Error(error.message));
      })
    );
  }
}
