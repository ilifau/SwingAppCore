import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeImprintPage } from './home-imprint.page';

const routes: Routes = [
  {
    path: '',
    component: HomeImprintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeImprintPageRoutingModule {}
