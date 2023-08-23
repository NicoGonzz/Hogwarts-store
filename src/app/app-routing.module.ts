import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { JugueteriaComponent } from './pages/jugueteria/jugueteria.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
  path: 'home',
  component: HomeComponent
  },
{
  path: 'register',
  component: RegisterComponent
},
{
  path: 'login',
  component: LoginComponent
},
{
  path: 'jugueteria',
  component: JugueteriaComponent
},
{
  path: 'profile',
  component: ProfileComponent
},
{
  path: 'category/:myID', //Recibo parametros por ULR
  component: CategoryComponent
},
{
  path: 'product/:id', //Recibo parametros por ULR
  component: ProductDetailComponent,
},
{
  path: '**',
  redirectTo: '/home',
  pathMatch: 'full',
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
