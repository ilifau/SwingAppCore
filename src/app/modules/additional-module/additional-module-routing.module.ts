import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdditionalModulePage } from './additional-module.page';

const routes: Routes = [
  {
    path: '',
    component: AdditionalModulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalModulePageRoutingModule {}
