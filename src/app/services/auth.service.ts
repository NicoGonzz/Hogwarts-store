import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth.model';
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
  profile(token: string ){
    return this.http.get(`${this.apiURL}/profile`);
  }
}
