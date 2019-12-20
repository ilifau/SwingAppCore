import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";

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
      private route: ActivatedRoute,
      public textService: TextService,
      public dictService: DictionaryService,

  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    const moduleId = this.route.snapshot.paramMap.get('moduleId');

    this.dictService.getModule(moduleId).subscribe((data: any) => {
      this.module = data;
    });
  }

}
