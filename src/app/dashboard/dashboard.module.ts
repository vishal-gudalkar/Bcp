import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { T001S01StockEntryComponent } from './components/transactions/components/t001-s01-stock-entry/t001-s01-stock-entry.component';
import { MenuComponent } from 'src/app/menu/menu.component';
import { T002S01StockRemovalComponent } from './components/transactions/components/t002-s01-stock-removal/t002-s01-stock-removal.component';
import { T003S01BinChangeComponent } from './components/transactions/components/t003-s01-bin-change/t003-s01-bin-change.component';
import { T004S01StatusChangeComponent } from './components/transactions/components/t004-s01-status-change/t004-s01-status-change.component';
import { T002P01ProductionDeclarationComponent } from './components/transactions/components/t002-p01-production-declaration/t002-p01-production-declaration.component';
import { T004P01OpenDrawingComponent } from './components/transactions/components/t004-p01-open-drawing/t004-p01-open-drawing.component';
import { CreateProductionLabelComponent } from './components/transactions/components/create-production-label/create-production-label.component';
import { T005S1StorageChangeComponent } from './components/transactions/components/t005-s01-storage-change/t005-s01-storage-change.component';
import { T003P01PrintLabelComponent } from './components/transactions/components/t003-p01-print-label/t003-p01-print-label.component';
import { T006S01StockEntryStraComponent } from './components/transactions/components/t006-s01-stock-entry-stra/t006-s01-stock-entry-stra.component';
import { T007S01StockRemovalStraComponent } from './components/transactions/components/t007-s01-stock-removal-stra/t007-s01-stock-removal-stra.component';
import { AddUserComponent } from './components/admin/add-user/add-user.component';
import { LoadDataComponent } from './components/admin/load-data/load-data.component';
import { ImportDataComponent } from './components/admin/import-data/import-data.component';
import { StockWmsComponent } from './components/reports/components/stock-wms/stock-wms.component';
import { StockMovementsComponent } from './components/reports/components/stock-movements/stock-movements.component';
import { ProductionControlComponent } from './components/reports/components/production-control/production-control.component';
import { OpenOrdersComponent } from './components/reports/components/open-orders/open-orders.component';
import { DeliveriesComponent } from './components/reports/components/deliveries/deliveries.component';
import { PackingListComponent } from './components/reports/components/packing-list/packing-list.component';
import { ProductionMovementsComponent } from './components/reports/components/production-movements/production-movements.component';
import { ReactiveFormsModule } from '@angular/forms';

export const DashboardRoutes = [
  { path: '', component: MenuComponent },
  { path: 'transactions/T001_S01_StockEntry', component: T001S01StockEntryComponent}
]


@NgModule({
  declarations: [
    T001S01StockEntryComponent,
    T002S01StockRemovalComponent,
    T003S01BinChangeComponent,
    T004S01StatusChangeComponent,
    T002P01ProductionDeclarationComponent,
    T004P01OpenDrawingComponent,
    CreateProductionLabelComponent,
    T005S1StorageChangeComponent,
    T003P01PrintLabelComponent,
    T006S01StockEntryStraComponent,
    T007S01StockRemovalStraComponent,
    AddUserComponent,
    LoadDataComponent,
    ImportDataComponent,
    StockWmsComponent,
    StockMovementsComponent,
    ProductionControlComponent,
    OpenOrdersComponent,
    DeliveriesComponent,
    PackingListComponent,
    ProductionMovementsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ReactiveFormsModule]
})
export class DashboardModule { }
