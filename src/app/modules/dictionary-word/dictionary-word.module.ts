import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { DictionaryWordPage } from './dictionary-word.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: DictionaryWordPage }])
  ],
  declarations: [
      DictionaryWordPage
  ]
})
export class DictionaryWordModule {}
