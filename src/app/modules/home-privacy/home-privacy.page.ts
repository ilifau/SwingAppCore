import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";

@Component({
  selector: 'app-home-privacy',
  templateUrl: './home-privacy.page.html',
  styleUrls: ['./home-privacy.page.scss'],
})
export class HomePrivacyPage implements OnInit {

  texts: any = {};

  constructor(
      public textService: TextService,
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

}
