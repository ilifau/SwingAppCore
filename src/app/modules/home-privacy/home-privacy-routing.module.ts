import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePrivacyPage } from './home-privacy.page';

const routes: Routes = [
  {
    path: '',
    component: HomePrivacyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePrivacyPageRoutingModule {}
