import { Component, OnInit } from '@angular/core';
import {Config, IonList, ModalController} from '@ionic/angular';
import { TextService } from '../../services/text.service';
import {FilterPage} from "../filter/filter.page";
import {TrainingService} from "../../services/training.service";
import { MemoOverview } from '../../interfaces/memo-overview';

@Component({
  selector: 'app-training',
  templateUrl: 'training.page.html',
  styleUrls: ['training.page.scss']
})
export class TrainingPage implements OnInit {

  ios: boolean;
  texts: any = {};
  overview: any = {};

  constructor(
      public config: Config,
      public modalCtrl: ModalController,
      public textService: TextService,
      public trainService: TrainingService
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    this.updateOverview();
  }

  updateOverview() {
    this.trainService.getOverview().subscribe((overview: MemoOverview) => {
      this.overview = overview;
    });
  }


  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.updateOverview();
    }
  }

}
