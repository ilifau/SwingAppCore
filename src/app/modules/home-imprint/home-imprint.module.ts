import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeImprintPageRoutingModule } from './home-imprint-routing.module';

import { HomeImprintPage } from './home-imprint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeImprintPageRoutingModule
  ],
  declarations: [HomeImprintPage]
})
export class HomeImprintPageModule {}
