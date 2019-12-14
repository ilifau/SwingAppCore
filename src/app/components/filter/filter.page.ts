import { AfterViewInit, Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';

import { DictionaryService } from '../../services/dictionary.service';


@Component({
  selector: 'page-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements AfterViewInit {
  ios: boolean;

  modules: {id: number, name: string}[] = [];
  units: {id: number, name: string, isChecked: boolean}[] = [];

  constructor(
      public dictSrv: DictionaryService,
      private config: Config,
      public modalCtrl: ModalController,
      public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;
  }

  // TODO use the ionViewDidEnter event
  ngAfterViewInit() {
    // passed in array of unit ids that should be excluded (unchecked)
    const excludedUnitIds = this.navParams.get('excludedUnitIds');

    this.dictSrv.getUnits().subscribe((units: any[]) => {
      units.forEach(unit => {
        this.units.push({
          id: unit.id,
          name: unit.name,
          isChecked: (excludedUnitIds.indexOf(unit.id) === -1)
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