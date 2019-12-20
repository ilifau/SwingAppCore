import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdditionalModulePageRoutingModule } from './additional-module-routing.module';

import { AdditionalModulePage } from './additional-module.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdditionalModulePageRoutingModule
  ],
  declarations: [AdditionalModulePage]
})
export class AdditionalModulePageModule {}
