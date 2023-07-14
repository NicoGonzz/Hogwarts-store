import { Component } from '@angular/core';
import { StoreService } from 'src/app/services/store.service';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

      activeMenu = false;
      counter = 0;
      token = '';
      profile: User | null = null;

      private sub$!: Subscription;


      constructor (
        private storeService: StoreService,
        private authService : AuthService,
      ){}

      ngOnInit(): void{
        /*this.storeService.myCart$.subscribe(products => {
            this.counter = products.length;
        })*/
      }

      toggleMenu() {
        this.activeMenu = !this.activeMenu;
      }
      login(){
        this.authService.login(
          'nicolas@gmail.com',
           'nicolas1234'
        )
        .subscribe(rta=>{
          console.log(rta.access_token);
          this.token = rta.access_token;
          this.getProfile();
        });
      }
      getProfile(){
        this.authService.profile(this.token)
        .subscribe(user =>{
          this.profile = user;
        })
      }

}
