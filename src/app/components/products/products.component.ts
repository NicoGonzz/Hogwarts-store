import { Component } from '@angular/core';
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
    today = new Date(); //Pipe de fecha
    date = new Date(2021,3,3);
      constructor
      (private storeService : StoreService,
       private productsService: ProductsService ){ /*Inyeccion de dependencias*/
      //Asi podemos usar el storeservice dentro de un componente
        this.myShoppingCart = this.storeService.myShoppingCart;
    }
      ngOnInit(){
        //this.productsService.getAllProducts() Se traen todos los productos
        this.productsService.getProductsByPage(10,0) //Se traen 10 productos en la pagina 0
        .subscribe(data =>{
          this.products = data;
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
    onShowDetail(id: string){
      this.productsService.getProduct(id)
      .subscribe(data =>{
        this.toggleProductDetail();
        this.productChosen = data;
      })
          //console.log('Id'); //Recibimos el evento y con este podemos hacer requests
    }
    createNewProduct(){
      const product : CreateProductDTO = {
          title: 'Lord Voldemort',
          price: 350,
          images: ['./assets/images/voldemort.jpg'],
          description: 'Juguete de Lord Voldemort ',
          categoryId: 2,
      }
      this.productsService.create(product)
      .subscribe(data=>{
        console.log('created',data);
        this.products.unshift(data); //Insertamos el nuevo producto al array en la primera posicion
      }); //Envio interfaz tipo producto
    }
    generateRandomImageUrl() {

    }
      updateProduct(){
        const changes: UpdateProductDTO={
          images: [`https://m.media-amazon.com/images/I/71uDtF71f+L._AC_UY1100_.jpg`],
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
