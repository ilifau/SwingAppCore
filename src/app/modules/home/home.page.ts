import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text.service';
import { FilterPage } from '../filter/filter.page';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  texts: any = {};

  constructor(
      public modalCtrl: ModalController,
      public textService: TextService,
      public app: AppComponent
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { }
    });
    await modal.present();
  }

  async checkForUpdate() {
    await this.app.checkForUpdate();
  }
}
