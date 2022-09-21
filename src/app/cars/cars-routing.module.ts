import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddComponent } from './pages/add/add.component';
import { CarComponent } from './pages/car/car.component';
import { EditComponent } from './pages/edit/edit.component';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent } from './pages/list/list.component';
import { SearchComponent } from './pages/search/search.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {path: 'list', component: ListComponent},
      {path: 'add', component: AddComponent},
      {path: 'edit/:id', component: EditComponent},
      {path: 'search', component: SearchComponent},
      {path: ':id', component: CarComponent},
      {path: '**', redirectTo: 'list'},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }
