import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config, ModalController} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import { MediaService} from "../../services/media.service";
import {DictionaryService} from "../../services/dictionary.service";
import {FilterPage} from "../filter/filter.page";

@Component({
  selector: 'app-additional-module',
  templateUrl: './additional-module.page.html',
  styleUrls: ['./additional-module.page.scss'],
})
export class AdditionalModulePage implements OnInit {

  ios: boolean;
  module: any = {};
  texts: any = {};


  constructor(
      public config: Config,
      public modalCtrl: ModalController,
      private route: ActivatedRoute,
      public textService: TextService,
      public dictService: DictionaryService,
      public mediaService:MediaService,

  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    const moduleId = this.route.snapshot.paramMap.get('moduleId');

    this.dictService.getModule(moduleId).subscribe((data: any) => {
      this.module = data;

      if (this.ios && this.module.videoName) {
        this.mediaService.loadVideo('moduleVideoName'+ this.module.id, 'content/'+this.module.videoName);
      }
      if (this.ios && this.module.videoDesc) {
        this.mediaService.loadVideo('moduleVideoDesc'+ this.module.id, 'content/'+this.module.videoDesc);
      }

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
