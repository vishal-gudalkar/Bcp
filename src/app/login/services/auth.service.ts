import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userName = new BehaviorSubject<string>('Vishal');
  constructor() { }
}
