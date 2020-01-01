import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule} from "@angular/router";
import { FilterPage } from './filter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: 'filter', component:FilterPage }])
  ],
  declarations: [
      FilterPage
  ]
})
export class FilterPageModule {}
