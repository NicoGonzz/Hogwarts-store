import { Component, OnInit, Input,Output,EventEmitter, OnChanges,AfterViewChecked, AfterViewInit,OnDestroy } from '@angular/core';
/*Con el output se debe tener el EventEmitter*/
@Component({
  selector: 'app-img',  /* Selector */
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, AfterViewInit {

      @Input() img: string= '';
      @Output() loaded = new EventEmitter<string>(); /*El event emiter transmite Strings*/
       imageDefault="./assets/images/descarga.jpg";

      constructor() { /*Lo que corre desde el inicio */
      /*No se pueden crear cosas asincronas como peticiones o fetchs y se corren una sola vez*/
        console.log('constructor','imgValue =>',this.img);
      }

      ngOnChanges(){ /*Corre antes del render y durante este*/
      /*Cambio en los inputs por tiempo*/
      console.log('ngOnChanges','imgValue =>',this.img);
      }

      ngOnInit(): void {
        /*Corre antes de renderizarce y corre UNA SOLA VEZ*/
        /*Aca podemos correr cosas asincronas como fetch-apis-promesas */
        console.log('ngOninit','imgValue =>',this.img);
      }

      ngAfterViewInit(): void {
        /*Corre despues de que todo se renderice y maneja los hijos */
        console.log('ngAfterViewInit');
      }

      ngOnDestroy(){
        /*Borrar un componente de la interfaz */
        console.log('ngOnDestroy');
      }

      imgError(){
        this.img = this.imageDefault; /*Si hay un error mostrara la otra imagen */
      }
      imgLoaded(){
        console.log('Log hijo');
        this.loaded.emit(this.img); /*Emitimos el evento al padre y enviamos informacion */
      }
}
