import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-additional-about',
  templateUrl: './additional-about.page.html',
  styleUrls: ['./additional-about.page.scss'],
})
export class AdditionalAboutPage implements OnInit {

  texts: any = {};
  media: any = {};

  constructor(
      public textService: TextService,
      public mediaService: MediaService,
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
    this.mediaService.load().subscribe((data: any) => {
      this.media = data;
    });
  }
}
