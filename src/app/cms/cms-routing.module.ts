import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TasksComponent } from './pages/tasks/tasks.component';
import { GridComponent } from './pages/grid/grid.component';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
     children: [
      {
        path: '',//si no me dan ningun path
        redirectTo: 'grid',
        pathMatch: 'full'
      },
      {
        path: 'grid', //En la ruta grid renderizara el componente grid component
        component: GridComponent
      },
      {
        path: 'tasks', //En la ruta grid renderizara el componente task component
        component: TasksComponent
      },
     ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
