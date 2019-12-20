import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePrivacyPageRoutingModule } from './home-privacy-routing.module';

import { HomePrivacyPage } from './home-privacy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePrivacyPageRoutingModule
  ],
  declarations: [HomePrivacyPage]
})
export class HomePrivacyPageModule {}
