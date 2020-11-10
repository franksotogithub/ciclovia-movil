import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCicloviaPage } from './list-ciclovia.page';

const routes: Routes = [
  {
    path: '',
    component: ListCicloviaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCicloviaPageRoutingModule {}
