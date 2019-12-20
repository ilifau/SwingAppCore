import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-additional-unit',
  templateUrl: './additional-unit.page.html',
  styleUrls: ['./additional-unit.page.scss'],
})
export class AdditionalUnitPage implements OnInit {

  ios: boolean;
  unit: any = {};
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

    const unitId = this.route.snapshot.paramMap.get('unitId');

    this.dictService.getUnit(unitId).subscribe((data: any) => {
      this.unit = data;
    });
  }

}
