import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrainingPage } from './training.page';
import { FilterPageModule } from '../filter/filter.module';
import { TrainingResetPageModule } from '../training-reset/training-reset.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FilterPageModule,
    TrainingResetPageModule,
    RouterModule.forChild([{ path: '', component: TrainingPage }])
  ],
  declarations: [TrainingPage]
})
export class TrainingPageModule {}
