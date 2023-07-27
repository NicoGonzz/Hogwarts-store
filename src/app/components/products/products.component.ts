import { Component } from '@angular/core';
import { zip } from 'rxjs'; //Permite enviar 2 observadores y recibir respuestas de ambos al tiempo
import { switchMap } from 'rxjs'; //Evita el callback Hell
import {Product , CreateProductDTO, UpdateProductDTO} from '../../models/products.model'
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

    ];
    showProductDetail = false;
    productChosen: Product = {
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
    limit= 10; //Muestra de a 10 elementos
    offset = 0; //Punto inicial
    statusDetail: 'loading' | 'sucess' | 'error' | 'init' = 'init';
    today = new Date(); //Pipe de fecha
    date = new Date(2021,3,3);
      constructor
      (private storeService : StoreService,
       private productsService: ProductsService ){ /*Inyeccion de dependencias*/
      //Asi podemos usar el storeservice dentro de un componente
        this.myShoppingCart = this.storeService.myShoppingCart;
    }
    predefinedProducts: Product[] = [
      // Contenido de predefinedProducts...
    ];
      ngOnInit(){
        const predefinedProducts = [
          {
            id: '1',
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
            id: '2',
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
            id: '3',
            title: 'Ronald Weasley',
            price: 400,
            images: ['./assets/images/weasley.jpg'],
            description: 'Juguetito chevere',
            category: {
              id: '',
              name: ''
            }
          },
          {
            id: '4',
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
            id: '5',
            title: 'Luna Lovegood',
            price: 250,
            images: ['./assets/images/luna.jpg'],
            description: 'Juguetito chevere',
            category: {
              id: '',
              name: ''
            }
          },
          {
            id: '6',
            title: 'Sirious Black',
            price: 280,
            images: ['./assets/images/Sirius.jpg'],
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
          } ];
        //this.productsService.getAllProducts() Se traen todos los productos
        this.productsService.getProductsByPage(10,0) //Se traen 10 productos en la pagina 0
        .subscribe(data =>{
          this.products = predefinedProducts.concat(data);
          this.offset += this.limit;
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

    toggleProductDetail(){ //Activamos el producto
      this.showProductDetail = !this.showProductDetail; //El estado del producto cambia
    }

    onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();

    // Verificar si el producto está en predefinedProducts
    const predefinedProduct = this.predefinedProducts.find((product) => product.id === id);

    if (predefinedProduct) {
      this.productChosen = predefinedProduct;
      this.statusDetail = 'sucess';
    } else {
      // Producto no encontrado en predefinedProducts, obtenerlo del servicio
      this.productsService.getProduct(id).subscribe(
        (data) => {
          this.productChosen = data;
          this.statusDetail = 'sucess';
        },
        (errMsg) => {
          window.alert(errMsg);
          this.statusDetail = 'error';
        }
      );
    }
  }


    readAndUpdate(id: string){ //Id del producto obtenido y actualizado
        this.productsService.getProduct(id)
        .pipe(
          switchMap((product) => //La respuesta de uno me da el valor de otro
          this.productsService.update(product.id,{title: 'TituloActualizado'})),
          //Evitamos calbackHell this.productsService.update(product.id,{title: 'TituloActualizado'}),
          //this.productsService.update(product.id,{title: 'TituloActualizado'}))
          )
          .subscribe(data =>{ //Cuando acabe de ejecutar todo todo
              console.log(data);
          });
          this.productsService.fetchReadandUpdate(id,{title: 'Titulo Cambiado'})
          .subscribe(response =>{
            const read = response[0]; // Ponemos el primer observaod getProductId
            const update = response[1]; //Update(id,title)
          })
    }

    createNewProduct(){
      const product : CreateProductDTO = {
          title: 'Bellatrix Lestrange',
          price: 280,
          images: ['https://m.media-amazon.com/images/I/51Q0oUoj7pL.jpg'],
          description: 'Juguete de Bellatrix Lestrange',
          categoryId: 11,
      }
      this.productsService.create(product)
      .subscribe(data=>{
        console.log('created',data);
        this.products.unshift(data); //Insertamos el nuevo producto al array en la primera posicion
      }); //Envio interfaz tipo producto
    }

      updateProduct(){
        const changes: UpdateProductDTO={
          title: 'Chaqueta Griffindor',
          price: 800,
          images: ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJpxYS1jhPvp8MS-TEUVei_Heh6om59XXjdQ&usqp=CAU'],
          description: 'Chaqueta de la casa de Griffindor aesthetic'
        }
        const id = this.productChosen.id;
        this.productsService.update(id,changes)
        .subscribe(data=>{
          const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
          this.products[productIndex] = data;
          this.productChosen = data;
        }); //Corrobora el tipado
      }

    deleteProduct(){
      const id = this.productChosen.id;
      this.productsService.delete(id)
      .subscribe(() =>{
        const productIndex = this.products.findIndex(item => item.id === this.productChosen.id);
        this.products.splice(productIndex,1);
        this.showProductDetail = false;
        // Necesitamos el index para ver cual array de productos vamos a remover
      })
    }

    loadMoreProducts(){
      this.productsService.getProductsByPage(10,0) //Se traen 10 productos en la pagina 0
      .subscribe(data =>{
        this.products = this.products.concat(data); //No se sobreescribe el array sino se agreganlos nuevos datos
        this.offset = this.limit;//Cuando se haga el request se aumenten los elementos del limit
      });
    }
}
