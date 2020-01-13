import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { TrainingAnswerPage } from './training-answer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TrainingAnswerPage }])
  ],
  declarations: [TrainingAnswerPage]
})
export class TrainingAnswerPageModule {}
