import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(
    private http: HttpClient //Creamos el servicio y por inyeccion de dependencias incorporamos el cliente
  ) {
  }

  getAllProducts() { /*LLamamos a product service de todos los productos */
      return this.http.get<Product[]>('https://young-sands-07814.herokuapp.com/api/products');
      //Tipamos la peticion con <> para decirle de que forma queremos que traiga el objeto

  }
}
