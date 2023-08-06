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
          }];
        //this.productsService.getAllProducts() Se traen todos los productos
        this.productsService.getProductsByPage(20,0) //Se traen 10 productos en la pagina 0
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
      this.productChosen = JSON.parse(JSON.stringify(predefinedProduct));
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
        title: 'Sirious Black',
        price: 280,
        images: ['data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYVFRgVFhUYGBgaGRoeHBgcHBoaHR0aHBgcGhgcHBwcJC4lHh4sHx4aJjgoLi8xNTU1GiQ7QDs0Py40NTQBDAwMEA8QHhISGjQkISsxNDQ0NDQxNDQ0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDQ0NEA0NDQ0MTQ0NDE/NDQ0Mf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcDBQECBAj/xABBEAACAQIDBQYEBAMGBQUAAAABAgADEQQSIQUGMUFRByJhcYGREzKhwUJSgrFykvAUI6Ky0eEVM2Jj8SSDk6PC/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAMCAQT/xAAgEQEBAQEAAwADAAMAAAAAAAAAAQIREiExA0FREzJh/9oADAMBAAIRAxEAPwC5YiICIiAiIgIiICIiAiIvAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQE1219sUcMmetUVF4C/Fja9lA1Y25CeDezeRMFSzkZqjXCU72LEcSTyUaXPiBxIlJbT2jVxFQ1azl3PPgAPyov4V8P3OsxrXGs56sTH9qKg/3OGZh+ao4p+wUNMFDtUa/fwgA6rVv9GQSuxTb8pmWlhiTqbfWT89K+GU22j2nV3BFCgidHYlz/KAAD6mRyrvfj2JJxT+QyLb0VRNW4F7chOFXS5OUcupjytJnM/Ta0t8cepuMS58GFNh/iQyQ7J7Tq6kDEUUqLfV07jAdcpurH1WQg25E+sxsOkTVhcSrlrdo2BVFYPUYsPlVGzDwbNZQfWaqt2qUvw4aof4mRf2zSrgpJnYqRxBnbuuf44tzZ/aXhXIFRalI9SudfdLn6SV7P2pRrrmo1UqAcSrBrHoQNQfOfPBIP9azLhcS9JxUpuyOvBlNm8vEeBuDOzd/bl/H/H0hEhe5O+i4oCjWsmIA8lqAfiUcmtxX1GnCaSkvU7OERE64REQEREBERAREQEREBERATV7e2vTwtFqtQmw0VRbMzHgq35/sATym0Mpbf/bJxGKZAe5QJRByL8Hb37v6fGZ1eRrM7Wm2ztOpjK5rVLBjYBQe6ii9kW/mSSeJPkBiRFXh7nj/ALTGug/rnOha51OnPxMl/wBW5xlfEryBbxJtMZxDtw0HgPvHxV5Zj7ATur3Fu6PNr/sJwjA62mN7s1hcngANfAADzmeo4vcsDbkBpJJ2f4EPXeow/wCWoK/xuSAfQBveLeOz2jr7MxCfPRqL+hz9QIpYCq+i0ah8ka3uRLoE5Osx5N8VQ262JSk1UoLjXINXy8yANLjpx9rTVLU9R/XtLpZBI1tvdKnWYuh+E54lRdWPUrpr4i3rE05c/wAV7lpnnMLUxyP3m5xu7OJp37gdRzSx+hs01ATWxFiOR0PsZqXrPHVHZSGUkMCCrDRgRqCD1vLn3E3m/tlIq9vjU7B7fiB+VwOV7EEciD4SnCs2O7e2GweISuNV+V117yEjNoOJFsw8RbnN51ys7z2L+iYqFZXVWUhlYAqw4EEXBHpMssgREQEREBERAREQEREBERAxV3yqxPAAn2F583pVL2Zj3m7zeZ1P1MvHf/FGngMQQSCyqlxy+I60z9GMo5eUlv6r+N6HPHz+wtPMzafWeljpYC5PIcyeQmfY9FRiaa1bKFqAOGsAChJIY8LXEwo3Wyty6lRVeo4pAi4TLme3K4uAvlqetuEwbf2BTw2VRWLudcpRQAt7XJBvrY2FtbGWBQxCuLo6uOqkMPpIVt/BNWx60rkLU+GbjkgTvkePcf1MxLf21c+mkwOzzUfJSQu3MDgviznur+/SWLu5scYZCCQXcguRe2l8qi/IAnXmSTpwntwmFSkgRECIOCgfU9T48ZmvOXXXc54yZozToDOc041xzecFp1JnBaBw0022dj064OdRm5ONGHrz8ps6tZVF2IUdSQB7medK6uMyMrDqpDD3EfD0rHHYZ6Dmm+tuB6g8D+/kRPKzSU78Ux/dPzu6/RSPvIezSkvYlfS7+zbFGpgKV+KF08grkKP5cslcrPsex91xFA/hZKg/WCjW/kX3lmT0Z+PPr6RETrhERAREQEREBERAREQIV2qYkLgShOtSpTUfpb4h+ifWU8GsZO+1PHF8SlEfLSp5v1vx9lVf5pX78ZHV9rYnpv8AdTD/ABMSGPCmpfwvoF+pv+mc4rZ5fHNTL5r2eo6gLlBUFrKSbcVHE/Nrzm43RwuSiXI71Q3H8C6L7nMfUSPbWxNP+1VKWuUd+rc/O51VT/21U/LwubmZzPKqaszntZq2zcPnC0cZSL3sFZ1Bv4Oh4+kyDG4nDVUqVgz5MyqXJcFW0YK9+JHC506SFbxYhXfugC3TSSvs5247M2GdiwC5kJ1sFPeXXiNQR0sZvWORPO/K8+LVV5knjw73nrWQr08cxEGcOOjtIDtPbWKrVqlOhmVUZlsgAbusVzO5+W9uRGh5ycV2sJCd79rlClFWKtVJLsNCEX5rHkxuBfiBfnaaxO3jG/U61TbOpK1sTi6aPzXMHcfxM50PoZusFsFEIqUcQ6tbRhkYEeIAAYeEgW8mIplQiKq+X7mddzttPRrJTzE06jBSvIEmysOhudeo9JbWPSOdzvuLC3uQnDqxIJR1JIFh3gVNhc21I5yDsOEn+2Vz4eoDyQt6rZvtIXTpi4BPEW/0k8q6ntIuzPElMei30qI6Hzy/EH+T6y7Z844PENSr0XGjJVpn0Drf3Fx6z6Ol8/Hm19IiJpkiIgIiICIiAiIgIiIFFb4uRj8WW451C+RpIF/eaB0uTbpJP2n4Y08c7cqiI/qB8Nh/gB9ZocKvdJ8PtrIanur5vpYSUgqKq6AKoHkABKm34wbU8Wzm4WoAynhfQBh5gj6iW7hmzojdVU+6gzxbV2PTrrkqqGW9xyIPUEagzONeN9q7z5Z5FEHjJj2bYRmxDVLHKiMCeWZtAPO2Y+k3w7OqGa/xKpW/y932zWku2VspKChKaBFHLiSeZJOpPnKa3Oeksfisva2eGE9izDTW0zEzzvS5vOGM8tWrY8eY+956LwdefECVf2nYV81KsL5QGUkciTmX319palQXmrx+CV1ZXUMrCxB4ETeNeN6xrPlnj5+cm+pvNnu5g2q4ikoF7MrHwVSCx9vqRJ1X7PqBa6vUVfygqfYkX97zfbI2FSw65aa2va7HVmt1P24S13Oekc/h1329Zp5gVPA3B8joZX1TuMVvfKxAPkbfaWLiWyIzflVm/lUn7StiCx69ZKK6r0Yannr0k/NVpr/M6ifR8+acLiTTqJUB1p1Ef+Rg32n0qDLY+PNv65iIm2CIiAiIgIiICIiAiIgVV2uoDXw/X4b/AEZbfuZA0rdwjwk07VMRmxiJ+Sivu7uT9FEgrcSP6tIavtfH+qb7t7YV7UW0KogUn8RAs32t6ySqQRcG4PAiVIlax18vcTd7B2+aFka7Uzy5p1Kjp1H34zuf4rnSwggmRQBNHQ2/RfLlcXZiqghgSQAbWtpxGvjM2L2ulJM7mwvYcSSegA/oTnK35RsMdtGnRXNUcKDoBxJP/So1P25yO4/fAg2pU/1Ob6fwKdPUyK43aFXEuGILNawAGii5NunPieM9eC2Mz2LtlH5Rqfedmf6xdWuam8Dl8xyXOt8i/wBdPebjB74uDapTVl5FO6fUG4P0mPJgUBpEICSLg3JzD5e9yIzHnznix+wgCWpNb/oOo8geXred5Kz7iaYDa9KvcI9yOKkZWHjY8R4i89L2MqynUq4d1fKVZeB+YaggjTTgTpJrsrbQrIDcZwBnXhY9Rf8ACevpM3PGs6bhkExtYTXYjbFNCyu4DKoYixvYkActTqNOOokb25vD8QFKZIQjvNwLgjVbW0Xr1iS1q7kbbeHaSouTi1QMCOisjAH3K+l5DsMeOvEgE+/3Mw4jFEm97kW1JuSfGYqTGUk4ldddsSLBh5/tPpHAPemhIIJVTY8eA4yhN2dinGYlKOuT5qjdEX5vVtFH8V+U+hAJXCO/pERNsEREBERAREQEREBERApbtObLtA350aZHu4/cGRR5Zna5sjNTTFKNaZCP/A5AQ+jm36zKrWqZHU9rYvpjxz5WHlr9p1p1oxNM2zHWYKanQC5ZjZQNSSegGpPhOydjltle5attQSDpYjQix0N5wz8h/XWbXaO6uJw+EGKrgIC6qKZ1ezZrM/JdQBbU97lwmgu+htYG9j1I4295zxJrrZYHaT0hYAFb3sePoRw+s2i7eFuBHhp/rI0wbIp4Esy+yqR+89WCoFycxt/R/wBIsa69lbGq1VamThx6kjgemmk2H/HRa9m8tP8AWad8LZSCWz3sEt5a+I8R4Tpj8PksA9z00PvbnpOcc8nsxu13cFQAqn1JHn/tPAr24zyZm4/acGqwOtrTvi55vc9Tx/oCwHtpMD1ZmxGzsQlJK70nWlUAK1Ld1geGo4E8gbE8p4h5zvjxzy6yU2zHwE9ipOuAVBdmPpO1arcm17dZmtz4snsfwZvia3I/DQeahmb/ADJ7S0JEOzLAGlgKbH5qrNVPk2if4FSS+VzORG3tIiJpwiIgIiICIiAiIgIiIHl2hg0rU3pOoZHUqwPRhYyi6m5WODfC/s7s4a3xBbIw/NmvYLz118Jf04tOWddl4guxuzbCpTUV1NapxZi7qtzyVQR3RyvrJLsnd3C4Yk0MPTpk8WA7x/Ubn6zbTo7AAk8Bx8uccc6ifaFtlKGGanlV6lYFURgGAt81RlPEKSPUqJU2yd36tUdxSUTQXNgL6kXPv6z37Z2k+LrtXY5QTZAfw01uVAvwNtT1JMlu71K1BMuWxu12vfvE8vKR3qz4t+PPUExO79Wm2V06WZRnBPOxHhfiBwmD/hx5304906HmDp1095NdvOA9O7hRmbvFlQBshsbn1HPjNdh6+Hup+JSXK72BdbhWTQaGxsT48DNZvY5rMl4jg2cbfK5GnID5vk49WKj19vQdjvmtkfW9rlRe3zc+Qm3TEJ8JDnBYJRXKMzHuMjnS2hBDcOOnSZhVRSoUuwzNeyVDlX4WRfw6/Kvv6zTHEar7IqMxVKbsbBrKM9gSRrbhqCPSY8XsxlGV1KEqLqwsbEf+ZZuxHBp5gblrk2BBv0IOoPgeE1G91AuUdVJIDCx0JHGw8ZPz7rivh66kG4W8S4ukcLiArVUSxBC5atPRc2W1ri4DC1tQedhl2h2Z4Cp8qPRP/bew9FfMo9BKvwW0Hw9VK9Igshup4XHBke3Ii4PnfpL92fihVpU6q8HRXHkyg/eVzeo2cqCYnsrw3wmWm9QVdLVXbMLjkUUKtjw0F5odldmmJNdVxHwxQDZnKNmLgcFAZQRfgegOlzwuKJ3kO10poALAWA0AHAAcBO8ROuEREDicxEBERAREQEREBERAREQE8m06BejVReLU3UebKQP3nriB85U37rC1mFlII1BzWYHoQwtJhh9rU6SZXQMq8Dp8tryZbxbkYfFFnA+FVI1qLwY6fOugfgBfQ6cZXe8O4NbD0KtZ66FEAyhQ+Z2ZwqhgdF1a/P7yWs9Uzvjpjt4sO7h0VzxGUaADr3tL36TCu8SDhTb/AOQD9l8JGsPs+41mb+ylWIA004jw1nc8npy2323FLbiqoX4ZNgB/zDyFtBl0HhOx3iHKklvFnI9vQTWCkLjpbXrc35dNJhVCxAI0v0nT2mOwtv0lRjUrJS7xsijl+q5mXEbTSpUUq+YLzJHXUyDYjCzebubmYjE0Fr0GQgu6urMVIKnTkQwIIP2k/CW9b87Jxr8TUUfEP4c5y9LC1z5WP0EvLc7DvTwWHRwQwprcHiL6hT4gED0kX3a7OxRqrWruj5NVpKpKh73DM7auQdR3RY2PISwgJXM4nq9cxETTJERAREQEREBERAREQEREBERAREQEREBId2nv/wCiyfnrU19iX/8AxJjK/wC07Ea4al1Luf0hUH+czOvjs+oFkC2vOUxKhytibEcLa6Cel6YOhFxPBVwV87kgd45dSOGnSSz9Vru9VS+cHQaWtrYXB/czs+JUkKAdSONuokdC/wB7k015685u6GzrWPduCDzvxF+XGUrLtWp3Jlhdkj2oV0/LXuB4NTT7qZB2XWSfsur5cTXp8npqw80ax/z/AEmc32anpaMREqmREQEREBERAREQEREBERAREQEREBERAREQEq3fzEZ8dl5U6SD9TFmP0yS0pWvagER6GRFWrUZi1QKMxRFVQCeerj+WZ18azeVF3qgMFtxmmr1n7x1tmbKLaWLGbtMM66q1+ua59uk1WNq5O5a9gNb/ANdJPM5fbWq0SMc2c8b/AHtN5h67kAG+hHLiLjXhLK2JsDDNsunUOHpGo+Fz58ilsz0ywOa17i/HwlbUcdmQELrbmfDym7HJetkw702O5Vf4e0KY/Orr7oWH1USPVdosflTXxOn01Mk/ZjSWriqhrIrOiK9IkfIQxVyo4Xsya8Rr1mM5vXdX0tyIiWTIiICIiAiIgIiICIiAiIgIiICIiAiIgIiIHEqnf7E1HxxRR3adNAOHF7ux1/T/ACyXb4bznBhFRA1R7kZr5VUaFjbUm5Atpz1lbYrH13d6zkFnNyV8rAAG9gBoPKZ1f01nNvtx/aai3Drp1y/cTTbRxaEEsuvXymzG13BuxLDpwt5cpqMai4h8q/jKILDUs7ZbW9ZmNWcXrsLDZdn0KfTC01/+oCUjszFU0Re5fujj5DrPoSnSCqFHAAKPIC0+eaFNKbsr6lHZCDyKsVIt5i01WY3CYxn+SmqjwFz9gJsd0K709oUS97OHTS1gzLdc1uV1t5kTT1do3ACd30HtadqdWrmWopsyEMrHkVIINvSZ61c9i+IkL3P3wbE1DQqoq1MpZWW+VgLZhYklSLjmb69JNJuXrFnCIidcIiICIiAiIgIiICIiAiIgIiICIiAiIgQrffdivi6lN6RpgIjKczMpuzA8lNxpI224mNAsPhnyqH7pLZiZuetTVinB2d45jYiio6mox+gSSPd3s4XD1aeIqV2d0bMFVQqX1AuWuxte/KWBEeMLq0IkG3l3ATE1XrpVam7AXUqrIWAAubWbUcdeMnMTtnXJeKgfs6xiGymk45EOy/Qpp7zMm4mNIsRTH/uH7IZbMTnjHfKq93R3OxGGxS16hpZQjrZWYtdrWtdAOXWWFETsnHLekRE64REQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQP//Z'],
        description: 'Funko Pop de Sirius Black: Hechicero valiente, miembro de la Orden del Fénix, padrino de Harry Potter.',
        categoryId: 14,
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
    realizarPago(){

    }
}
