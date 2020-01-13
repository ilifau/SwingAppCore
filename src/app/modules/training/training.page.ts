import { Component, OnInit } from '@angular/core';
import {Config, ModalController} from '@ionic/angular';
import { TextService } from '../../services/text.service';
import {FilterPage} from "../filter/filter.page";
import {TrainingResetPage} from "../training-reset/training-reset.page";
import {TrainingService} from "../../services/training.service";
import { MemoMode } from '../../interfaces/memo-mode';
import { MemoOverview } from '../../interfaces/memo-overview';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-training',
  templateUrl: 'training.page.html',
  styleUrls: ['training.page.scss']
})
export class TrainingPage implements OnInit {

  ios: boolean;
  texts: any = {};
  overview: any = {};

  // make enum available in template
  MemoMode = MemoMode;

  constructor(
      public config: Config,
      public modalCtrl: ModalController,
      public textService: TextService,
      public trainService: TrainingService,
      private router: Router,
      private route: ActivatedRoute
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

  async resetTraining() {
    const modal = await this.modalCtrl.create({
      component: TrainingResetPage,
      componentProps: { }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.updateOverview();
    }
  }

  setNextDay() {
    this.trainService.setNextDay().subscribe(() => {
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
