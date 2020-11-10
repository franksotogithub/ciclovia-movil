import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CicloviaPage } from './ciclovia.page';

const routes: Routes = [
  {
    path: '',
    component: CicloviaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CicloviaPageRoutingModule {}
