import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAboutPageRoutingModule } from './home-about-routing.module';

import { HomeAboutPage } from './home-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAboutPageRoutingModule
  ],
  declarations: [HomeAboutPage]
})
export class HomeAboutPageModule {}
