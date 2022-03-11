import { Component, OnInit } from '@angular/core';
import { login } from 'src/environments/environment';
import { LoginData } from '../models/loginData.model';
import { ServiceService } from '../pokemons/service.service';
@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  loginData ?: LoginData;
  constructor(private service : ServiceService) { }

  ngOnInit(): void {
    this.selogin(login);
  }

  selogin(data:Object) : void{
    this.service.postLogin(data)
    .subscribe(res => this.loginData = res);
  }
}
