import { Component, OnInit } from '@angular/core';
import {ProductsComponent } from 'src/app/components/products/products.component';
@Component({
  selector: 'app-jugueteria',
  templateUrl: './jugueteria.component.html',
  styleUrls: ['./jugueteria.component.scss']
})
export class JugueteriaComponent implements OnInit {

  predefinedProducts: any[] = [];
  products : any[] = [];
  constructor() {
    this.predefinedProducts = [
      {
        id: '261',
        title: 'Harry Potter',
        price: 500,
        images: ['./assets/images/potter.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '263',
        title: 'Hermione Granger',
        price: 450,
        images: ['./assets/images/hermione.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '264',
        title: 'Ronald Weasley',
        price: 400,
        images: ['https://simaro.co/media/catalog/product/F/u/Funko-POP-de-Harry-Potter-HP---Ron-Weasley-con-Scabbers_1.jpeg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '267',
        title: 'Draco Malfoy',
        price: 350,
        images: ['./assets/images/draco.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '268',
        title: 'Luna Lovegood',
        price: 250,
        images: ['https://target.scene7.com/is/image/Target/GUEST_ca39b4bf-f885-4477-b0df-345058571d10?wid=488&hei=488&fmt=pjpeg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '7',
        title: 'Rubeus Hagrid',
        price: 400,
        images: ['./assets/images/Hagrid.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '8',
        title: 'Dobby',
        price: 320,
        images: ['./assets/images/Dobby.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '9',
        title: 'Dumbledore',
        price: 340,
        images: ['./assets/images/Dumbledore.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '10',
        title: 'Lord Voldemort',
        price: 500,
        images: ['./assets/images/voldemort.jpg'],
        description: 'Juguetito chevere',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '248',
        title: 'Bellatrix Lestrange',
        price: 280,
        images: ['https://m.media-amazon.com/images/I/51Q0oUoj7pL.jpg'],
        description: 'Juguetito chevere de Bellatrix Lestrange',
        category: {
          id: '',
          name: ''
        }
      }
    ];
}
  ngOnInit(){
    this.products = this.predefinedProducts;
  }
}
