import { Component } from '@angular/core';
import {Product} from '../../models/products.model'
import { StoreService } from '../../services/store.service'
import { ProductsService } from '../../services/products.service' //Traemos de donde traeremos los productos

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  myShoppingCart: Product[] = [];
  total=0;
  products : Product[] = [  //Creamos la interfaz y que sea igual a esa
      {
        id: '1',
        title: 'Harry Potter',
        price: 500,
        image: './assets/images/potter.jpg',
      },
      {
        id: '1',
        title: 'Hermione Granger',
        price: 450,
        image: './assets/images/hermione.jpg'
      },
      {
        id: '2',
        title: 'Ronald Weasley',
        price: 400,
        image: './assets/images/weasley.jpg'
      },
      {
        id: '3',
        title: 'Draco Malfoy',
        price: 350,
        image: './assets/images/draco.jpg'
      },
      {
        id: '4',
        title: 'Luna Lovegood',
        price: 250,
        image: './assets/images/luna.jpg'
      },
      {
        id: '4',
        title: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '4',
        title: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '5',
        title: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '6',
        title: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      { id: '7',
        title: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      }/*Array de productos para el array*/
    ];
    today = new Date(); //Pipe de fecha
    date = new Date(2021,3,3);
      constructor
      (private storeService : StoreService,
       private productsService: ProductsService ){ /*Inyeccion de dependencias*/
      //Asi podemos usar el storeservice dentro de un componente
        this.myShoppingCart = this.storeService.myShoppingCart;
    }
      ngOnInit(){
        this.productsService.getAllProducts()
        .subscribe(data =>{
          this.products = data;
        });// Funcion para traer datos
      }
    onAddToBuy(product : Product){
      this.storeService.addProduct(product);
      this.total = this.storeService.getTotal();;
      //this.myShoppingCart.push(product);
      //this.total = this.myShoppingCart.reduce((sum,item)=> sum + item.price,0); //Suma el total del  precio de los items seleccionados
      console.log(product); //Recibimos el producto de la clase hijo PRODUCT
    }
    onSubstractToBuy(product: Product){
      const index = this.myShoppingCart.findIndex(item => item.id === product.id);
      if (index !== -1) {
        this.myShoppingCart.splice(index, 1); // Eliminar el producto del carrito
        this.total -= product.price; // Restar el precio del producto al total
      }
    }
}
