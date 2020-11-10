import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CicloviaPageRoutingModule } from './ciclovia-routing.module';

import { CicloviaPage } from './ciclovia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CicloviaPageRoutingModule
  ],
  declarations: [CicloviaPage]
})
export class CicloviaPageModule {}
