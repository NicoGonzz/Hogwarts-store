import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { environment } from 'src/Environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = `${environment.API_URL}/api/auth`; //API del backend

  constructor(
    private http: HttpClient
  ) { }

  login(email:string,password:string){
    return this.http.post<Auth>(`${this.apiURL}/login`,{email,password});
  }
  profile(token:string){
    //let headers= new HttpHeaders();
    //headers =headers.set('Authorization', `Bearer ${token}`);
    //headers = headers.set('Content-type', 'application/json');
    return this.http.get<User>(`${this.apiURL}/profile`,{
      headers:{
        Authorization: `Bearer ${token}`,
      }
    });
  }
}
