import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  isAuthenticated: boolean = false;
  constructor(private router: Router, private authService: AuthService, public authStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { 
    
  }

  ngOnInit(): void {
  }

  processLogin(userName: string): void{
    this.authService.userName.next(userName);
    //this.router.navigate(['/dashboard/']);
    this.router.navigate(['/login/callback']);
  }

  async login() {
    this.authStateService.authState$.subscribe(res => {
      this.isAuthenticated = res.isAuthenticated;
    })
    if(this.isAuthenticated){
      await this.oktaAuth.signOut();
    }
    else{
    await this.oktaAuth.signInWithRedirect({ originalUri: '/dashboard' });
    }
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

}
