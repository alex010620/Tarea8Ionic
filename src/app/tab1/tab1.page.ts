import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {AlertController, MenuController} from '@ionic/angular'
import { isUndefined } from 'util';
import { CentralService } from '../services/central.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
hola:any
conver: any
titulo:string=""
key:string
  constructor(private menu: MenuController, private datos: CentralService, private router:Router, private http:HttpClient, private alerta:AlertController ) {}

ngOnInit() {
this.datos.$getObjectSource.subscribe(data => {
this.conver = data
this.hola=this.conver.iniciadoSesion
this.titulo = this.conver.Titulo
this.key = this.conver.key
console.log(this.conver)
if(this.hola===undefined){
  this.redireccion()
}
if (this.titulo==="") {
  document.getElementById('div3').style.display="none"
  document.getElementById('div4').style.display="none"
} else {
  document.getElementById('div1').style.display="none"
  document.getElementById('div2').style.display="none"
}
}).unsubscribe();
}
async redireccion() {
  const alert = await this.alerta.create({
    cssClass: 'my-custom-class',
    header: 'Upss',
    message: 'Usted no se encuentra logueado!!!',
    buttons: [
       {
        text: 'Ok',
        handler: () => {
          this.router.navigate(['login']);
        }
      }
    ]
  });
  await alert.present();
}
async presentAlertConfirm() {
  const alert = await this.alerta.create({
    cssClass: 'my-custom-class',
    header: 'Secrets',
    message: 'Quieres eliminar el  secretor?',
    buttons: [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
        }
      }, {
        text: 'Si',
        handler: () => {
         this.EliminarSecretos()
        }
      }
    ]
  });
  await alert.present();
}

EliminarSecretos(){
  this.http.get("/api/Eliminar/"+this.key+"")
    .subscribe(data=> {
      this.conver = data;
      this.alertases()
    });
    document.getElementById('div1').style.display="block"
    document.getElementById('div2').style.display="block"

    document.getElementById('div3').style.display="none"
    document.getElementById('div4').style.display="none"
}
async alertases(){
  let miAlerta = await this.alerta.create({
    header: '',
      message: this.conver.respuesta,
      buttons: ['OK']
  });
  await miAlerta.present()
}


}
