import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";

@Component({
  selector: 'app-home-imprint',
  templateUrl: './home-imprint.page.html',
  styleUrls: ['./home-imprint.page.scss'],
})
export class HomeImprintPage implements OnInit {

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
