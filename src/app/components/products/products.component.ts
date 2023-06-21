import { Component } from '@angular/core';
import {Product} from '../../models/products.model'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products : Product[] = [  //Creamos la interfaz y que sea igual a esa
      {
        id: '1',
        name: 'Harry Potter',
        price: 500,
        image: './assets/images/potter.jpg',
      },
      {
        id: '1',
        name: 'Hermione Granger',
        price: 450,
        image: './assets/images/hermione.jpg'
      },
      {
        id: '2',
        name: 'Ronald Weasley',
        price: 400,
        image: './assets/images/weasley.jpg'
      },
      {
        id: '3',
        name: 'Draco Malfoy',
        price: 350,
        image: './assets/images/draco.jpg'
      },
      {
        id: '4',
        name: 'Luna Lovegood',
        price: 250,
        image: './assets/images/luna.jpg'
      },
      {
        id: '4',
        name: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '4',
        name: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '5',
        name: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      {
        id: '6',
        name: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      },
      { id: '7',
        name: 'Lord Voldemort',
        price: 500,
        image: './assets/images/voldemort.jpg'
      }/*Array de productos para el array*/
    ];
}
