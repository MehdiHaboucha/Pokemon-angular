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
      .subscribe((res) => {
        this.loginData = res;
        console.log('res');
        console.log(res);
        if (this.loginData) {
          localStorage.setItem('user',this.pseudo);
          localStorage.setItem('token', this.loginData?.access_token);
          localStorage.setItem('isLoggedIn',"true");
          this.redirect();
        } else {
          //TODO get l'erreur
          console.log("erreur d'authentification à getter");
        }
      });
  }

  //login clické
  login() {
    console.log('pseudo : ' + this.pseudo);
    console.log('password : ' + this.motDepasse);
    console.log();
    this.seLogin();
  }
}
