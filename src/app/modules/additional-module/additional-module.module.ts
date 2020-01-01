import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { AdditionalModulePage } from './additional-module.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component:AdditionalModulePage }])
  ],
  declarations: [AdditionalModulePage]
})
export class AdditionalModulePageModule {}
