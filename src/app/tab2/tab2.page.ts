import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
nombre:string=""
correo:string=""
clave:string=""
convercion:any
  constructor(private router:Router,private http:HttpClient) {}
  irLogin(){
    this.router.navigate(['login']);
  }

  datos(){
    if (this.nombre == ""|| this.clave =="" || this.correo =="") {
      alert("Hay algun campo vacio...")
    } else {
     this.http.get("/api/registrar/"+this.nombre+"/"+this.correo+"/"+this.clave+"")
     .subscribe(data=> {
       this.convercion = data;
       alert(this.convercion.Registro);
   })
   this.limpiar()
    }

 }
 limpiar(){
  this.nombre = "";
  this.correo = "";
  this.clave ="";
 }
}
