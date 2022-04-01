import { Injectable } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  items: MenuItems[] = [];
  constructor() { }

  getItemsPerRole(role: string) {
      let roles: Role[] = [
        { roleId:1, roleName:'prod', accessMenuItems:[1,2,3,4,5,6,7,8,12,13,14,15,16,17] },
        { roleId:2, roleName:'sd', accessMenuItems:[7,12,14,16,17] },
        { roleId:3, roleName:'pp', accessMenuItems:[7,12,13,14,15,16,17] },
        { roleId:4, roleName:'sdsc', accessMenuItems:[7,12,16,17,18] },
        { roleId:5, roleName:'ship', accessMenuItems:[1,2,3,4,5,7,9,12,13,14,16,17,18] },
        { roleId:6, roleName:'wh', accessMenuItems:[1,2,3,4,5,7,9,10,11,12,13,16,17,18] },
        { roleId:7, roleName:'all', accessMenuItems:[19,20,21] }
      ];
      this.items = [
        { 
          label: 'Transactions',
          icon: 'pi pi-fw pi-money-bill',
          items: [
              {itemId:1, label: 'T001_S01_Stock Entry', icon: 'pi pi-fw pi-forward', routerLink:'transactions/stockentry'},
              {itemId:2, label: 'T002_S01_Stock Removal', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/stockremoval'},
              {itemId:3, label: 'T003_S01_BIN Change', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/binchange'},
              {itemId:4, label: 'T004_S01_Status Change', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/statuschange'},
              {itemId:5, label: 'T005_S01_Storage Change', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/storagechange'},
              {itemId:6, label: 'T002_P01_Production Declaration', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/productiondeclaration'},
              {itemId:7, label: 'T004_P01_Open Drawing', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/opendrawing'},
              {itemId:8, label: 'Create production label', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/createproductionlabel'},
              {itemId:9, label: 'T003_P01_Print Label', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/printlabel'},
              {itemId:10, label: 'T006_S01_StockEntry - STRA', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/stockentrystra'},
              {itemId:11, label: 'T007_S01_StockRemoval - STRA', icon: 'pi pi-fw pi-forward', routerLink: 'transactions/stockremovalstra'}
          ]
        },
        {   
            label: 'Reports',
            icon: 'pi pi-pw pi-copy',
            items: [
                {itemId:12, label: 'Stock WMS', icon: 'pi pi-fw pi-file', routerLink: 'reports/stockwms'},
                {itemId:13, label: 'Stock movements', icon: 'pi pi-fw pi-file', routerLink: 'reports/stockmovements'},              
                {itemId:14, label: 'Production control', icon: 'pi pi-fw pi-file', routerLink: 'reports/prodcontrol'},
                {itemId:15, label: 'Production movements', icon: 'pi pi-fw pi-file', routerLink: 'reports/prodmovements'},
                {itemId:16, label: 'Open orders', icon: 'pi pi-fw pi-file', routerLink: 'reports/openorders'},
                {itemId:17, label: 'Deliveries', icon: 'pi pi-fw pi-file', routerLink: 'reports/deliveries'},
                {itemId:18, label: 'Packing list', icon: 'pi pi-fw pi-file', routerLink: 'reports/packinglist'}
            ]
        },
        {
          label: 'Admin',
          icon: 'pi pi-fw pi-cog',
          items:[
            {
              itemId:19, 
              label: 'Add user',
              icon: 'pi pi-fw pi-user-plus',
              routerLink: 'admin/add-user'
            },
            {
              itemId:20,
              label: 'Load data',
              icon: 'pi pi-pw pi-upload',
              routerLink: 'admin/load-data'
            },
            {
              itemId:21,
              label: 'Import Data from Blob Container',
              icon: 'pi pi-pw pi-download',
              routerLink: 'admin/import-data'
            }    
          ]
        }     
      ];

      let userRole: any[] = roles.find(r=> r.roleName == role)?.accessMenuItems;

      if(userRole.length > 0) 
       {
          this.items.map(x => {x.items = (x.items.filter(y => userRole.includes(y.itemId)))});
          this.items = this.items.filter(x => x.items.length > 0);
       }

    return this.items;
  }
}

export interface MenuItems extends MenuItem
{
   itemId? :number;
   items? :MenuItems[]
}

