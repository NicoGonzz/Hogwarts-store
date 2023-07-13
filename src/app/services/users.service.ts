import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User,CreateUserDTO } from '../models/user.model';
import { environment } from 'src/Environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiURL = `${environment.API_URL}/api/users`; //API del backend

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUserDTO){
    return this.http.post<User>(this.apiURL,dto); //Creamos con un post
  }

  getAll(){
    return this.http.get<User[]>(this.apiURL);
  }
}
