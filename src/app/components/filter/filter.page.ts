import {AfterViewInit, Component, OnInit} from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

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
      public modalCtrl: ModalController,
      public navParams: NavParams
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

    // passed in array of unit ids that should be excluded (unchecked)
    const excludedUnitIds = this.navParams.get('excludedUnitIds');

    this.dictService.getModules().subscribe((modules: any[]) => {
      this.modules = modules;
      this.modules.forEach((module: any) => {
        module.units.forEach((unit: any) => {
          unit.isChecked = (excludedUnitIds.indexOf(unit.id) === -1);
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
    // Pass back a new array of unit ids to exclude
    const excludedUnitIds = this.units.filter(c => !c.isChecked).map(c => c.id);
    this.dismiss(excludedUnitIds);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}