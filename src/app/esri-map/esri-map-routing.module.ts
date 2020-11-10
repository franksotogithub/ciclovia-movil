import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EsriMapPage } from './esri-map.page';

const routes: Routes = [
  {
    path: '',
    component: EsriMapPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EsriMapPageRoutingModule {}
