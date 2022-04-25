import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { LoginComponent } from './login/components/login.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/component/header.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { StockEntryService } from './dashboard/components/transactions/services/stockEntry.service';
import { StockWmsReportService } from './dashboard/components/reports/services/stockwmsReport.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuiModalService } from '@giomamaladze/ng2-semantic-ui';
import { OktaAuth } from '@okta/okta-auth-js';
import {
  OKTA_CONFIG,
  OktaAuthModule,
} from '@okta/okta-angular';
import { environment } from '../environments/environment';
import config from './app.config';
import { ConfirmModalComponent, ConfirmModal } from './modal/confirm.component';
import { APP_BASE_HREF } from '@angular/common';
import { AuthInterceptor } from './services/auth.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { CommonReportService } from './dashboard/components/reports/services/commonReport.service';
import {TableModule} from 'primeng/table';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HeaderComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    PanelMenuModule,
    BrowserAnimationsModule,
    DashboardModule,
    HttpClientModule,
    FormsModule,
    OktaAuthModule,
    ToastrModule.forRoot(),
    TableModule
  ],
  providers: [StockEntryService,StockWmsReportService,CommonReportService,
    { 
      provide: OKTA_CONFIG, 
      useFactory: () => {
        const oktaAuth = new OktaAuth(config.oidc);
        return {
          oktaAuth,
          onAuthRequired: (oktaAuth: OktaAuth, injector: Injector) => {
            const triggerLogin = async () => {
              await oktaAuth.signInWithRedirect();
            };
            if (!oktaAuth.authStateManager.getPreviousAuthState()?.isAuthenticated) {
              // App initialization stage
              triggerLogin();
            } else {
              // Ask the user to trigger the login process during token autoRenew process
              const modalService = injector.get(SuiModalService);
              modalService
                .open(new ConfirmModal("Do you want to re-authenticate?", "Auth required", "Yes", "No"))
                .onApprove(triggerLogin)
                .onDeny(() => {});
            }
          }  
        }
      }
    },
    { provide: APP_BASE_HREF, useValue: environment.appBaseHref },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent ],
  entryComponents: [ConfirmModalComponent],
})
export class AppModule { }
