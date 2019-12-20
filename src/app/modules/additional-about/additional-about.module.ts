import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalAboutPageRoutingModule } from './additional-about-routing.module';

import { AdditionalAboutPage } from './additional-about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalAboutPageRoutingModule
  ],
  declarations: [AdditionalAboutPage]
})
export class AdditionalAboutPageModule {}
