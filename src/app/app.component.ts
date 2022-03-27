import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'pokedex';
  constructor(private router: Router) {}

  seDeconnecter() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/team']);
  }

  getLogIn() {
    if (localStorage.getItem('isLoggedIn') === null) return false;
    return localStorage.getItem('isLoggedIn');
  }
  getUser() {
    return localStorage.getItem('user');
  }
}
