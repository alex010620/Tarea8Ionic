import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router'
import { AlertController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { CentralService } from '../services/central.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

convercion:any
correo:string
clave:string
  constructor(private http:HttpClient, private router:Router, public alerta: AlertController, private datos: CentralService, private json: CentralService) { }

  ngOnInit() {
  }
  
login(){
  if (this.correo=="" || this.clave=="") {
    this.alertasVacio();
  } else {
    this.json.getJson("/api/iniciar/"+this.correo+"/"+this.clave+"").subscribe((data:any)=> {
      this.convercion = data;
      if (this.convercion =="Las credenciales son incorrectas") {
        this.alertas();
      } else {
        this.datos.enviar(this.convercion)
        this.router.navigate(['tab1']);
        this.clave=""
        this.correo=""
      }
      
  });
  }
  
}

async alertas(){
  let miAlerta = await this.alerta.create({
    header: '',
      message: this.convercion,
      buttons: ['OK']
  });
  await miAlerta.present()
}
async alertasVacio(){
  let miAlerta = await this.alerta.create({
    header: '',
      message: 'Los campos de inicio de session no pueden estar vacios',
      buttons: ['OK']
  });
  await miAlerta.present()
}
irRegistro(){
  this.router.navigate(['tab2']);
}

}
