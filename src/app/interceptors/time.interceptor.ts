import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs'; //Corre un proceso sin tener que cambiar o modificar la respuesta
@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const start = performance.now(); //Evalua el tiempo inicial de la request
    return next
      .handle(request)
        .pipe(
          tap(() =>{
            const time = (performance.now()- start + 'ms') //Momento que acabo la solicitud menos el inicio
            console.log(request.url,time); //Obtengo la Url y el time
          })
        ); //Al terminar de evaluar el tiempo inicial corre un proceso
  }
}
