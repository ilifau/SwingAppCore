import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalPage } from './additional.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalPageRoutingModule {}
