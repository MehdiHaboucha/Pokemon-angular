import { Component, OnInit } from '@angular/core';
import { LoginData } from '../models/loginData.model';
import { ServiceService } from '../pokemons/pok.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss'],
})
export class FormulaireComponent implements OnInit {
  loginData?: LoginData;
  pseudo: string = '';
  motDepasse: string = '';
  erreurLogIn :string='';
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    // this.seLogin();
  }

  //Redirection
  redirect(): void {
    this.router.navigate(['/mesPokemons']);
  }
  // se logIn
  seLogin(): void {
    console.log('Se log in api');
    this.service
      .postLogin({
        email: this.pseudo,
        password: this.motDepasse,
      })
      .subscribe({
      next: res=>{
           this.erreurLogIn='';
          localStorage.setItem('user', this.pseudo);
          localStorage.setItem('token', res.access_token);
          localStorage.setItem('isLoggedIn', 'true');
          this.loginData = res;
          this.redirect();
    },
      error:error=>{this.erreurLogIn=error.error.message}
    });
     
  }

  //login clické
  login() {
    console.log('pseudo : ' + this.pseudo);
    console.log('password : ' + this.motDepasse);
    this.seLogin();
  }
}
