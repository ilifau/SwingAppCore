import { Component, OnInit } from '@angular/core';
import { Config, ModalController} from '@ionic/angular';

import { TextService } from '../../services/text.service';
import { TrainingService } from '../../services/training.service';

@Component({
  selector: 'app-training-reset',
  templateUrl: './training-reset.page.html',
  styleUrls: ['./training-reset.page.scss'],
})
export class TrainingResetPage implements OnInit {

  ios: boolean;
  texts: any = {};

  constructor(
      public textService: TextService,
      public trainService: TrainingService,
      private config: Config,
      public modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;
  }

  ionViewDidEnter() {
  }

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  cancelReset() {
    this.modalCtrl.dismiss(false);
  }

  confirmReset() {
    this.trainService.resetTrainingStatus().subscribe((data: any) => {
      this.modalCtrl.dismiss(true);
    });
  }
}
