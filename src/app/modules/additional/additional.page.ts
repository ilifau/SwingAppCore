import { Component, OnInit } from '@angular/core';
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-additional',
  templateUrl: './additional.page.html',
  styleUrls: ['./additional.page.scss'],
})
export class AdditionalPage implements OnInit {

  texts: any = {};
  modules: any = [];

  constructor(
      public textService: TextService,
      public dictService: DictionaryService,
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
    this.dictService.getModules().subscribe((modules: any[]) => {
      this.modules = modules;
    });
  }
}
