import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingPage } from './training.page';
import { FilterPageModule } from '../filter/filter.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FilterPageModule,
    RouterModule.forChild([{ path: '', component: TrainingPage }])
  ],
  declarations: [TrainingPage]
})
export class TrainingPageModule {}
