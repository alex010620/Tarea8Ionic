import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CentralService {
  private objectSource = new BehaviorSubject<{}>({});
  $getObjectSource = this.objectSource.asObservable();
  constructor(private http:HttpClient) { }

  enviar(data:any){
    this.objectSource.next(data)
  }

  getJson(url: string){
    return  this.http.get(url);
  }
}

