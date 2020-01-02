import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";
import {FilterPage} from "../filter/filter.page";

@Component({
  selector: 'app-additional',
  templateUrl: './additional.page.html',
  styleUrls: ['./additional.page.scss'],
})
export class AdditionalPage implements OnInit {

  texts: any = {};
  modules: any = [];

  constructor(
      public modalCtrl: ModalController,
      public textService: TextService,
      public dictService: DictionaryService,
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
    this.dictService.getModules().subscribe((modules: any[]) => {
      this.modules = modules;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { }
    });
    await modal.present();
    await modal.onWillDismiss();
  }

}
