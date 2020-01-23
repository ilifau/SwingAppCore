import { Component, OnInit } from '@angular/core';
import { Config} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-additional-about',
  templateUrl: './additional-about.page.html',
  styleUrls: ['./additional-about.page.scss'],
})
export class AdditionalAboutPage implements OnInit {

  ios: boolean;
  texts: any = {};
  media: any = {};

  constructor(
      public config: Config,
      public textService: TextService,
      public mediaService: MediaService,
  ) {}

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
    this.mediaService.load().subscribe((data: any) => {
      this.media = data;

      if (this.ios && this.media.addiSignLanguage) {
        this.mediaService.loadVideo('mediaAddiSignLanguage', 'content/'+this.media.addiSignLanguage);
      }
    });
  }
}
