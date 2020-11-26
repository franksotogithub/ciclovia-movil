import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



import { IonicModule } from '@ionic/angular';

import { EsriMapPageRoutingModule } from './esri-map-routing.module';

import { EsriMapPage } from './esri-map.page';

@NgModule({
  imports: [
    CommonModule,
   
    IonicModule,
    EsriMapPageRoutingModule
  ],
  declarations: [EsriMapPage]
})
export class EsriMapPageModule {}
