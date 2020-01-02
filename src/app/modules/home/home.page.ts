import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text.service';
import { FilterPage } from '../filter/filter.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  texts: any = {};

  constructor(
      public modalCtrl: ModalController,
      public textService: TextService
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
}
