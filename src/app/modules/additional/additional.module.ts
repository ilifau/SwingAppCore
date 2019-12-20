import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalPageRoutingModule } from './additional-routing.module';

import { AdditionalPage } from './additional.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalPageRoutingModule
  ],
  declarations: [AdditionalPage]
})
export class AdditionalPageModule {}
