import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule} from "@angular/router";
import { TrainingResetPage } from './training-reset.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: 'reset', component:TrainingResetPage }])
  ],
  declarations: [TrainingResetPage]
})
export class TrainingResetPageModule {}
