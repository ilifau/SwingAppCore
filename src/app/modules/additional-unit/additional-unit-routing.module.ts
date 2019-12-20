import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalUnitPage } from './additional-unit.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalUnitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalUnitPageRoutingModule {}
