import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  texts: any = {};

  constructor(
      public textService: TextService
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }
  
}
