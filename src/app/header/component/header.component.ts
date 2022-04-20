import { Component, Inject, OnInit } from '@angular/core';
import { OktaAuthStateService, OKTA_AUTH } from '@okta/okta-angular';
import { filter, map, Observable } from 'rxjs';
import { AuthState, OktaAuth } from '@okta/okta-auth-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public name$!: Observable<string>;
  public role$!: Observable<string>;
  role: string = "";
  key: string = "role";  
  
  constructor(private oktaAuthStateService: OktaAuthStateService, @Inject(OKTA_AUTH) private oktaAuth: OktaAuth) { }

  ngOnInit(): void {    
    this.name$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.name ?? '')
    );

    this.role$ = this.oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.groups[1] ?? '')
    );

    this.role$.subscribe(res => {
      this.role = res;
    });
    localStorage.setItem(this.key, this.role);
  }

  async logout() {
    await this.oktaAuth.signOut();
  }

}
