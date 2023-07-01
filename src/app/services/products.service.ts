import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product , CreateProductDTO} from '../models/products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = 'https://young-sands-07814.herokuapp.com/api/products'; //

  constructor(
    private http: HttpClient //Creamos el servicio y por inyeccion de dependencias incorporamos el cliente
  ) {
  }

  getAllProducts() { /*LLamamos a product service de todos los productos */
      return this.http.get<Product[]>(this.apiURL);
      //Tipamos la peticion con <> para decirle de que forma queremos que traiga el objeto
  }
  getProduct(id: string){ //Primero ponemos el parametro de entrada en este caso string
      return this.http.get<Product>(`${this.apiURL}/${id}`) //get porque obtenemos informacion
      //Cojemos un unico producto y la url y despues con el / me traera el ID
    }

  create(dto: CreateProductDTO){ //Crear producto con la interfaz de tipo Product
    return this.http.post<Product>(this.apiURL,dto); //Retornara un producto y vendra el nuevo producto
   }
}
