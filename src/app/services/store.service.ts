import { Injectable } from '@angular/core';
import {Product} from '../models/products.model'
@Injectable({
  providedIn: 'root' // Injectables que se pueden injectar en otros servicios
})
export class StoreService {

  myShoppingCart: Product[] = [];


  constructor() { }

  addProduct(product : Product){
    this.myShoppingCart.push(product);
  }
  getTotal(){
   return this.myShoppingCart.reduce((sum,item)=> sum + item.price,0);
  }
}
