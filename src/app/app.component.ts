import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { ActivatedRoute,NavigationEnd } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  imgParent = '';
  isCmsRoute: boolean = false;
  showImg= true;
  token= '';//Guardamos el token en memoria
  title = 'Hogwarts-store';
  constructor(
    private authService : AuthService,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isCmsRoute = this.activatedRoute.snapshot.url[0]?.path === 'cms/grid';
      }
    });
  }

  onLoaded(img:string){
      console.log('Log padre',img);
  }
  toggleImg(){
    this.showImg = !this.showImg;
  }
  createUser(){
    this.usersService.create({
      name: 'Nicolas',
      email: 'nicolas@gmail.com',
      password: 'nicolas1234'
    })
    .subscribe(rta=>{
      console.log(rta);
    });
  }


}
