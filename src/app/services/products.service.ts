import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpStatusCode } from '@angular/common/http';
import { zip } from 'rxjs'; //Permite enviar 2 observadores y recibir respuestas de ambos al tiempo
import { delay, retry,catchError,Observable } from 'rxjs'; //Reintenta una peticion
import { throwError } from 'rxjs';
import { Product , CreateProductDTO,UpdateProductDTO} from '../models/products.model';
import {environment} from '../../Environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiURL = `${environment.API_URL}`; //

  constructor(
    private http: HttpClient //Creamos el servicio y por inyeccion de dependencias incorporamos el cliente
  ) {
  }
    getByCategory(categoryId:string ,limit?: number , offset?:number){
      let params = new HttpParams();
      if(limit && offset != null){
        params = params.set('limit',limit);
        params = params.set('offset',offset);
      }
        return this.http.get<Product[]>(('https://api.escuelajs.co/api/v1/products'),{params})

    }

  getAllProducts() { /*LLamamos a product service de todos los productos */
      return this.http.get<Product[]>(('https://api.escuelajs.co/api/v1/products'))
      .pipe( //Se reintenta esta peticion 3 veces si no entra a la URL
          retry(3)
      );
      //Tipamos la peticion con <> para decirle de que forma queremos que traiga el objeto
  }

  fetchReadandUpdate(id:string, dto: UpdateProductDTO){ //Abstraemos la logica del componente products
    return zip(
      this.getProduct(id),
      this.update(id,dto) //Dto con los cambios
    )
  }

  getProduct(id: string){ //Primero ponemos el parametro de entrada en este caso string
      return this.http.get<Product>(`${this.apiURL}/${id}`) //get porque obtenemos informacion
      //Cojemos un unico producto y la url y despues con el / me traera el ID
      .pipe( //CATCHError captura el error
        catchError((error: HttpErrorResponse) =>{
              if(error.status === HttpStatusCode.Conflict) { //Si hay un error del estado 500 se muestra en el front
                return throwError('Hay un error en el servidor');
              }
              if(error.status === HttpStatusCode.NotFound){// Error 404
                return throwError('El producto no existe');
              }
              if(error.status === HttpStatusCode.Unauthorized){
                return throwError('No estas autorizado');
              }
              return throwError('Ups algo salio mal');
        })
      )
    }

  getProductsByPage(limit: number , offset: number){
    return this.http.get<Product[]>(`${this.apiURL}`,{
      params: {limit,offset} //Se envian los parametros por URL de limit y offset
    }) //get porque obtenemos informacion
  }

  create(dto: CreateProductDTO){ //Crear producto con la interfaz de tipo Product
    return this.http.post<Product>(this.apiURL,dto); //Retornara un producto y vendra el nuevo producto
   }

   update(id:string,dto: UpdateProductDTO ){
    return this.http.put<Product>(`${this.apiURL}/${id}`,dto); //Patch actualizara solo una cosa mientras que put enviara Todo el cuerpo del producto
   }

   delete(id: string){
    return this.http.delete<boolean>(`${this.apiURL}/${id}`); //Retorna un boolean para ver si borro o no el elemento
   }

   searchProductsByName(name: string): Observable<Product[]> {
    const params = new HttpParams().set('name', name); // Agrega el parámetro de búsqueda 'name'
    return this.http.get<Product[]>(`${this.apiURL}`, { params })
   }

}
