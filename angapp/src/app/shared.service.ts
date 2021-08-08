import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Busdetails } from './busdetails';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  selectedbus = new BehaviorSubject(null);

  constructor(private http:HttpClient, private route:Router) { }
   registerPost(data:any){
    return this.http.post('http://localhost:8081/api/register', data)
  }
  loginGet(){
    return this.http.get('http://localhost:8081/api/register')
  }
 
 busDetails(){
    return this.http.get('http://localhost:8081/api/getbus')
    
  }
  updateDetails(data:any):Observable<Busdetails>{
 return this.http.patch<Busdetails>('http://localhost:8081/api/updateSeats', data)

    
  }
  
}
