import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/components/dashboard.component';
import { T001S01StockEntryComponent } from './dashboard/components/transactions/components/t001-s01-stock-entry/t001-s01-stock-entry.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { LoginComponent } from './login/components/login.component';
import { T002S01StockRemovalComponent } from './dashboard/components/transactions/components/t002-s01-stock-removal/t002-s01-stock-removal.component';
import { T003S01BinChangeComponent } from './dashboard/components/transactions/components/t003-s01-bin-change/t003-s01-bin-change.component';
import { T004S01StatusChangeComponent } from './dashboard/components/transactions/components/t004-s01-status-change/t004-s01-status-change.component';
import { T005S1StorageChangeComponent } from './dashboard/components/transactions/components/t005-s01-storage-change/t005-s01-storage-change.component';
import { T002P01ProductionDeclarationComponent } from './dashboard/components/transactions/components/t002-p01-production-declaration/t002-p01-production-declaration.component';
import { T004P01OpenDrawingComponent } from './dashboard/components/transactions/components/t004-p01-open-drawing/t004-p01-open-drawing.component';
import { CreateProductionLabelComponent } from './dashboard/components/transactions/components/create-production-label/create-production-label.component';
import { T003P01PrintLabelComponent } from './dashboard/components/transactions/components/t003-p01-print-label/t003-p01-print-label.component';
import { T006S01StockEntryStraComponent } from './dashboard/components/transactions/components/t006-s01-stock-entry-stra/t006-s01-stock-entry-stra.component';
import { T007S01StockRemovalStraComponent } from './dashboard/components/transactions/components/t007-s01-stock-removal-stra/t007-s01-stock-removal-stra.component';
import { AddUserComponent } from './dashboard/components/admin/add-user/add-user.component';
import { LoadDataComponent } from './dashboard/components/admin/load-data/load-data.component';
import { ImportDataComponent } from './dashboard/components/admin/import-data/import-data.component';
import { StockWmsComponent } from './dashboard/components/reports/components/stock-wms/stock-wms.component';
import { StockMovementsComponent } from './dashboard/components/reports/components/stock-movements/stock-movements.component';
import { ProductionControlComponent } from './dashboard/components/reports/components/production-control/production-control.component';
import { ProductionMovementsComponent } from './dashboard/components/reports/components/production-movements/production-movements.component';
import { OpenOrdersComponent } from './dashboard/components/reports/components/open-orders/open-orders.component';
import { DeliveriesComponent } from './dashboard/components/reports/components/deliveries/deliveries.component';
import { PackingListComponent } from './dashboard/components/reports/components/packing-list/packing-list.component';

const routes: Routes = [
  //{ path: 'login', loadChildren: () => import('./login/login.module').then(m=> m.LoginModule)  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: MenuComponent },
    { path: 'transactions/stockentry', component: T001S01StockEntryComponent },
    { path: 'transactions/stockremoval', component: T002S01StockRemovalComponent },
    { path: 'transactions/binchange', component: T003S01BinChangeComponent },
    { path: 'transactions/statuschange', component: T004S01StatusChangeComponent },
    { path: 'transactions/storagechange', component: T005S1StorageChangeComponent },
    { path: 'transactions/productiondeclaration', component: T002P01ProductionDeclarationComponent },
    { path: 'transactions/opendrawing', component: T004P01OpenDrawingComponent },
    { path: 'transactions/createproductionlabel', component: CreateProductionLabelComponent },
    { path: 'transactions/printlabel', component: T003P01PrintLabelComponent },
    { path: 'transactions/stockentrystra', component: T006S01StockEntryStraComponent },
    { path: 'transactions/stockremovalstra', component: T007S01StockRemovalStraComponent },
    { path: 'admin/add-user', component: AddUserComponent },
    { path: 'admin/load-data', component: LoadDataComponent },
    { path: 'admin/import-data', component: ImportDataComponent },
    { path: 'reports/stockwms', component: StockWmsComponent },
    { path: 'reports/stockmovements', component: StockMovementsComponent },
    { path: 'reports/prodcontrol', component: ProductionControlComponent },
    { path: 'reports/prodmovements', component: ProductionMovementsComponent },
    { path: 'reports/openorders', component: OpenOrdersComponent },
    { path: 'reports/deliveries', component: DeliveriesComponent },
    { path: 'reports/packinglist', component: PackingListComponent }

   ] },
  /*{ path: '', component: DashboardComponent, children: [
    { path: 'dashboard', loadChildren: ()=> import('./dashboard/dashboard.module').then(m=> m.DashboardModule)}
  ]},*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
