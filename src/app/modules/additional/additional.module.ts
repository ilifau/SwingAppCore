import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule} from "@angular/router";
import { IonicModule } from '@ionic/angular';
import { FilterPageModule } from '../filter/filter.module';
import { AdditionalPage } from './additional.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FilterPageModule,
    RouterModule.forChild([{ path: '', component:AdditionalPage }])
  ],
  declarations: [AdditionalPage]
})
export class AdditionalPageModule {}
