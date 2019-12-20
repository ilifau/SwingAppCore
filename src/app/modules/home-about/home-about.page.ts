import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";
import {MediaService} from "../../services/media.service";

@Component({
  selector: 'app-home-about',
  templateUrl: './home-about.page.html',
  styleUrls: ['./home-about.page.scss'],
})
export class HomeAboutPage implements OnInit {

  texts: any = {};
  media: any = {};

  constructor(
      public textService: TextService,
      public mediaService: MediaService
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
