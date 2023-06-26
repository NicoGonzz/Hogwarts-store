import { Injectable } from '@angular/core';
import {Product} from '../models/products.model';
import { BehaviorSubject } from 'rxjs'; //Sirve para crear un observable entre componentes

@Injectable({
  providedIn: 'root' // Injectables que se pueden injectar en otros servicios
})
export class StoreService {

  myShoppingCart: Product[] = [];
  private myCart = new BehaviorSubject<Product[]>([]);//Que es lo que traera


  myCart$ = this.myCart.asObservable; //Observable de angular con el signo $ lo convertimos en observable

  constructor() { }

  addProduct(product : Product){
    this.myShoppingCart.push(product); //Agregamos el producto
    this.myCart.next(this.myShoppingCart);//A my shopping cart transmitimos el estado del prodiucto
  }
  getTotal(){
   return this.myShoppingCart.reduce((sum,item)=> sum + item.price,0);
  }
}
