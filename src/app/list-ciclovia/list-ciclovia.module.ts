import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListCicloviaPageRoutingModule } from './list-ciclovia-routing.module';

import { ListCicloviaPage } from './list-ciclovia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListCicloviaPageRoutingModule
  ],
  declarations: [ListCicloviaPage]
})
export class ListCicloviaPageModule {}
