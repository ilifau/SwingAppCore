import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Config, ModalController} from '@ionic/angular';

import { TextService } from '../../services/text.service';
import { DictionaryService } from '../../services/dictionary.service';


@Component({
  selector: 'page-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  ios: boolean;

  texts: any = {};
  modules: any = [];
  units: any = [];

  constructor(
      public textService: TextService,
      public dictService: DictionaryService,
      private config: Config,
      public modalCtrl: ModalController
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;
  }

  ionViewDidEnter() {
  }

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    this.dictService.getFilter().subscribe((modules: any[]) => {
      this.modules = modules;
      this.modules.forEach((module: any) => {
        module.units.forEach((unit: any) => {
          this.units.push(unit);
        });
      });
    });
  }

  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.units.forEach(unit => {
      unit.isChecked = check;
    });
  }

  applyFilters() {
    const excludedUnitIds = this.units.filter(c => !c.isChecked).map(c => c.id);
    this.dictService.setExcludedUnitIds(excludedUnitIds);
    // Pass back a value to eventually trigger an update
    this.dismiss(true);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}