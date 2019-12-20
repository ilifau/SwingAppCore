import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAboutPage } from './home-about.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAboutPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAboutPageRoutingModule {}
