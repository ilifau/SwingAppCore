import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import { MediaService} from "../../services/media.service";
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
      public mediaService:MediaService,

  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    const unitId = this.route.snapshot.paramMap.get('unitId');

    this.dictService.getUnit(unitId).subscribe((data: any) => {
      this.unit = data;

      if (this.ios && this.unit.videoName) {
        this.mediaService.loadVideo('unitVideoName'+ this.unit.id, 'content/'+this.unit.videoName);
      }
      if (this.ios && this.unit.videoDesc) {
        this.mediaService.loadVideo('unitVideoDesc'+ this.unit.id, 'content/'+this.unit.videoDesc);
      }
    });
  }

}
