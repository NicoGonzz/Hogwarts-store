import { Component, OnInit } from '@angular/core';
import { Product}  from '../../models/products.model';
import { Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-jugueteria',
  templateUrl: './jugueteria.component.html',
  styleUrls: ['./jugueteria.component.scss']
})
export class JugueteriaComponent implements OnInit {

  @Output() addedProduct =new EventEmitter<Product>();

  @Input() product: Product = {
    id: '',
    price: 0,
    images: [],
    title: '',
    category: {
      id: '',
      name: '',
    },
    description: ''
  };
  cart: Product[] = [];
  private disabled:boolean = false;
  public accionCompra:string ='';
  showCart: boolean = false;
  totalPrice: number = 0;
  predefinedProducts: any[] = [];
  products : any[] = [];
  constructor() {
    this.predefinedProducts = [
      {
        id: '261',
        title: 'Harry Potter',
        price: 500,
        images: ['./assets/images/potter.jpg'],
        description: 'Coleccionable Harry Potter',
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
        description: 'Coleccionable Hermione Granger',
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
        description: 'Coleccionable Ronald Weasley',
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
        description: 'Coleccionable Draco Malfoy',
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
        description: 'Coleccionable Luna Lovegood',
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
        description: 'Coleccionable Rubeus Hagrid',
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
        description: 'Coleccionable Dobby',
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
        description: 'Coleccionable Dumbledore',
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
        description: 'Coleccionable Voldemort',
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
        description: 'Coleccionable Bellatrix ',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '249',
        title: 'funko neville longbottom',
        price: 480,
        images: ['https://http2.mlstatic.com/D_Q_NP_906293-MLA52797591571_122022-O.webp'],
        description: 'Coleccionable Neville Longbottom',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '248',
        title: 'Snape',
        price: 280,
        images: ['https://http2.mlstatic.com/D_NQ_NP_706562-MCO70559090564_072023-O.webp'],
        description: 'Coleccionable Snape',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '282',
        title: 'Cedric Diggory',
        price: 180,
        images: ['data:image/jpeg;base64,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'],
        description: 'Coleccionable Cedric Diggory',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '284',
        title: 'Remus Lupin',
        price: 320,
        images: ['data:image/jpeg;base64,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'],
        description: 'Coleccionable Remus Lupin',
        category: {
          id: '',
          name: ''
        }
      },
      {
        id: '288',
        title: 'Hedwig',
        price: 370,
        images: ['https://funko.com/on/demandware.static/-/Sites-funko-master-catalog/default/dw7681c197/images/funko/upload/70278_HP_Hedwig%20with%20Letter_POP_GLAM-WEB.png'],
        description: 'Coleccionable Hedwig',
        category: {
          id: '',
          name: ''
        }
      }
    ];
}
  ngOnInit(): void{
    this.products = this.predefinedProducts;
    this.accionCompra = `Comprar Producto`;
  }
  calculateTotalPrice() {
    this.totalPrice = this.cart.reduce((total, product) => total + product.price, 0);
  }
  onAddtoCar(product:Product){
    this.cart.push(product);
    this.disabled = true;
    this.accionCompra = `Comprar Producto`;
    this.showCart = true;
    this.calculateTotalPrice();
    this.addedProduct.emit(product);//Emitimos el producto
}
isProductAddedToCart(product: Product):boolean {
  return this.cart.some((item) => item.id === product.id);
  //return this.cart.some((cartProduct) => cartProduct.id === product.id);
}
isDisabled(){
  return !!this.disabled;
}
}
