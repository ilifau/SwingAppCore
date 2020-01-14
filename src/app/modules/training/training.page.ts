import { Component, OnInit } from '@angular/core';
import { Config, ModalController, AlertController } from '@ionic/angular';
import { TextService } from '../../services/text.service';
import { FilterPage} from "../filter/filter.page";
import { TrainingService} from "../../services/training.service";
import { MemoMode } from '../../interfaces/memo-mode';
import { MemoOverview } from '../../interfaces/memo-overview';
import { Router, ActivatedRoute} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-training',
  templateUrl: 'training.page.html',
  styleUrls: ['training.page.scss']
})
export class TrainingPage implements OnInit {

  ios: boolean;
  texts: any = {};
  overview: any = {};
  production: boolean = true;

  // make enum available in template
  MemoMode = MemoMode;

  constructor(
      public config: Config,
      public modalCtrl: ModalController,
      public alertController: AlertController,
      public textService: TextService,
      public trainService: TrainingService,
      private router: Router,
      private route: ActivatedRoute
  ) {}

  /**
   * Once when page is created
   */
  ngOnInit() {
    this.ios = this.config.get('mode') === `ios`;

    this.production = environment.production;

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  /**
   * Each time the page is shown
   */
  ionViewWillEnter() {
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

  async resetTraining() {
    const alert = await this.alertController.create({
      header: this.texts.trainResetStatus,
      message: this.texts.trainResetQuestion,
      buttons: [
        {
          text: this.texts.trainResetStatus,
          handler: () => {
            this.trainService.resetTrainingStatus().subscribe(() => {
              this.updateOverview();
            });
          }
        },
        {
          text: this.texts.commonCancel,
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }


  setNextDay() {
    this.trainService.setNextDay().subscribe(() => {
      this.updateOverview();
    });
  }

  addNewItems() {
    this.trainService.addNewItems().subscribe(() => {
      this.updateOverview();
    });
  }

  startTraining(mode: MemoMode) {
    this.trainService.getNextQuestion(mode).subscribe((data: any) => {
      if (data.itemId) {
        void this.router.navigate(['question/' + data.itemId +'/' + data.mode], { relativeTo: this.route });
      }
    });
  }
}
