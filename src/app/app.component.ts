import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { CentralService } from './services/central.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  [x: string]: any;
  conver:any
  key:any
  hola:any
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private http:HttpClient,
    private datos:CentralService,
    public alertController: AlertController,
    private alerta:AlertController
  ) {
    this.initializeApp();
  }
  ngOnInit() {
    }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
  irRegistro(){
    this.router.navigate(['tab3']);
  }
  irInicio(){
    this.router.navigate(['tab1']);
  }
  confSalir(){
    this.datos.$getObjectSource.subscribe(data => {
      this.conver = data
      }).unsubscribe();
      this.http.get("/api/salir/"+this.conver.key+"")
         this.router.navigate(['login']);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Secrets',
      message: 'Quieres salir de la aplicacion?',
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
            this.confSalir();
          }
        }
      ]
    });
    await alert.present();
}

async presentAlertPrompt() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Cambiar nombres de usuario',
    inputs: [
      {
        name: 'name1',
        type: 'text',
        placeholder: 'Nuevo nombre de usuario'
      },
      {
        name: 'name2',
        type: 'text',
        placeholder: 'Nuevo correo electronico'
      },
      
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log();
        }
      }, {
        text: 'Guardar',
        handler: (data) => {
          if (data.name1 == ""|| data.name2=="") {
            this.alertasVacio();
          } else {
            this.datos.$getObjectSource.subscribe(data => {
              this.conver = data
              this.hola=this.conver.key
              }).unsubscribe();
             if (this.hola===undefined) {
              this.redireccion() 
             } else {
              this.http.get("/api/modificar/"+data.name1+"/"+data.name2+"/"+this.conver.key+"")
              .subscribe(dat=> {
                this.conver = dat;
                this.alertas();
              })
             }
          }
        }
      }
    ]
  });

  await alert.present();
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

async CambiarPassword() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Cambiar la contraseña',
    inputs: [
      {
        name: 'name1',
        type: 'text',
        placeholder: 'Contraseña actual'
      },
      {
        name: 'name2',
        type: 'text',
        placeholder: 'Nueva contraseña'
      },
      
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log();
        }
      }, {
        text: 'Guardar',
        handler: (data) => {
          if (data.name1 == ""|| data.name2=="") {
            this.alertasVacio();
          } else {
            this.datos.$getObjectSource.subscribe(data => {
              this.conver = data
              this.hola=this.conver.key
              }).unsubscribe();
              if (this.hola===undefined) {
                this.redireccion()
              } else {
            this.http.get("/api/ModClave/"+data.name1+"/"+this.conver.key+"/"+data.name2+"")
            .subscribe(dat=> {
              this.conver = dat;
              this.alertas();
            })
              }
            
          }
        }
      }
    ]
  });

  await alert.present();
}

async alertas(){
  let miAlerta = await this.alerta.create({
    header: '',
      message: this.conver.respuesta,
      buttons: ['OK']
  });
  await miAlerta.present()
}


async alertasVacio(){
  let miAlerta = await this.alerta.create({
    header: '',
      message: 'Los campos de escritura no pueden estar vacios',
      buttons: ['OK']
  });
  await miAlerta.present()
}
}
