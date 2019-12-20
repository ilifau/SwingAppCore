import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalUnitPageRoutingModule } from './additional-unit-routing.module';

import { AdditionalUnitPage } from './additional-unit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalUnitPageRoutingModule
  ],
  declarations: [AdditionalUnitPage]
})
export class AdditionalUnitPageModule {}
