import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AdditionalModulePage } from './additional-module.page';
import { FilterPageModule } from '../filter/filter.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPageModule,
    RouterModule.forChild([{ path: '', component:AdditionalModulePage }])
  ],
  declarations: [AdditionalModulePage]
})
export class AdditionalModulePageModule {}
