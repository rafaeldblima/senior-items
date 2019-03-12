import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsComponent } from './items/items.component';
import { EditItemComponent } from './items/edit-item/edit-item.component';

const routes: Routes = [
  {
    path: 'items', data: {title: 'Pesquisar items'}, children: [
      {path: '', redirectTo: 'items', pathMatch: 'full'},
      {path: '', component: ItemsComponent, data: {title: 'Pesquisar items'}, children: []},
      {path: 'new-item', component: EditItemComponent, data: {title: 'Adicionar item'}, children: []},
      {
        path: 'item/:id',
        component: EditItemComponent,
        data: {title: 'Editar item'}
      },
    ]
  },
  {path: '**', redirectTo: 'items'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
