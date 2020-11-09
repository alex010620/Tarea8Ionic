import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CentralService } from '../services/central.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
 titulo:string=""
 descripcion:string=""
 valor:string=""
 fecha:string=""
 lugar:string=""
 long:string=""
 conver:any
 cor:any
 key:any
 hola:any
  constructor(private http:HttpClient, private datos:CentralService,private alerta:AlertController,private router:Router) {}

  
    ngOnInit() {
      this.datos.$getObjectSource.subscribe(data => {
      this.conver = data
      this.cor = this.conver.correo
      this.key = this.conver.key
      console.log(this.conver)
      this.hola=this.conver.iniciadoSesion
      console.log(this.conver.iniciadoSesion)
      if(this.hola===undefined){
        this.redireccion()
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
  guardar(){
    if (this.titulo == ""|| this.descripcion=="" || this.valor =="" || this.fecha=="" || this.lugar=="" || this.long=="") {
      alert("Hay un campo de texto vacio o todos ellos lo estan...")
    } else {
      if (this.hola===undefined) {
        this.redireccion()
      } else {
        this.http.get("/api/regSecretos/"+this.titulo+"/"+this.descripcion+"/"+this.valor+"/"+this.fecha+"/"+this.lugar+"/"+this.long+"/"+this.key+"/"+this.cor+"")
        .subscribe(data=> {
          this.conver = data;
          this.alertas();
        });
      }
      this.limpiar();
    }
    
  }
  async alertas(){
    let miAlerta = await this.alerta.create({
      header: '',
        message: this.conver.respuesta,
        buttons: ['OK']
    });
    await miAlerta.present()
  }
  limpiar(){
    this.titulo="";
    this.descripcion="";
    this.valor ="";
    this.lugar = "";
    this.long ="";
    this.fecha = "";
  }
  
}
