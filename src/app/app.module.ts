import { NgModule } from '@angular/core';
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
//import { FormsModule } from '@angular/forms';

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
    DashboardModule
    //FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent ]
})
export class AppModule { }
