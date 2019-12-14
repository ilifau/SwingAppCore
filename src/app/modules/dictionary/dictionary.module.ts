import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DictionaryPage } from './dictionary.page';

import { FilterPage } from '../../components/filter/filter.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: DictionaryPage }])
  ],
  declarations: [
      DictionaryPage,
      FilterPage
  ],
  entryComponents: [
      FilterPage
  ]
})
export class DictionaryPageModule {}
