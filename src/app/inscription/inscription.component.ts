import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../pokemons/pok.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss'],
})
export class InscriptionComponent implements OnInit {
  pseudo: string = '';
  motDepasse: string = '';
  erreurInscription:string="";
  constructor(private service : ServiceService,private router:Router) {}

  ngOnInit(): void {}

  inscription(){
      console.log('pseudo : ' + this.pseudo);
    console.log('password : ' + this.motDepasse);
      this.service.postInscription({"email":this.pseudo.trim(),"password":this.motDepasse.trim()}).subscribe({
        next: res=>{this.erreurInscription='';
        this.router.navigate(["team"]);
      },
        error:error=>{this.erreurInscription=error.error.message}
      });
  }
}
