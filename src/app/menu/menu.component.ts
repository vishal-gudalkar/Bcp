import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DashboardService } from 'src/app/dashboard/services/dashboard.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  role: any = "";
  key: string = "role";
  items: MenuItem[] = [];
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.role = localStorage.getItem(this.key)
    this.items = this.dashboardService.getItemsPerRole(this.role);
  }

}
