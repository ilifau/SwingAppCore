import { Component, OnInit } from '@angular/core';
import { IonList, ModalController} from '@ionic/angular';
import { TextService } from '../../services/text.service';
import {FilterPage} from "../filter/filter.page";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-training',
  templateUrl: 'training.page.html',
  styleUrls: ['training.page.scss']
})
export class TrainingPage implements OnInit {

  texts: any = {};

  constructor(
      public modalCtrl: ModalController,
      public textService: TextService,
      public dictService: DictionaryService
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  updateStatus() {
  }


  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.updateStatus();
    }
  }

}
