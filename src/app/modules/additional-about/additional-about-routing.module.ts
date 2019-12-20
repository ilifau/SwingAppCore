import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalAboutPage } from './additional-about.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalAboutPageRoutingModule {}
