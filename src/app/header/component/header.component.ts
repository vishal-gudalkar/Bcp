import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/login/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string = "";
  role: string = "prod";
  key: string = "role";
  //localStorage: any;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.userName.subscribe(res => {
      this.userName = res;
    });
    localStorage.setItem(this.key, this.role);
  }

  logout(){

  }

}
