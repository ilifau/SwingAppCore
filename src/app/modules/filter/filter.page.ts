import { Component, OnInit} from '@angular/core';
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

  /**
   * Once when page is created
   */
  ngOnInit() {
    this.ios = this.config.get('mode') === `ios`;

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  /**
   * Each time the page is shown
   */
  ionViewWillEnter() {
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

    const excludedUnitIds = this.units.filter(c => !c.isChecked).map(c => c.id);
    this.dictService.setExcludedUnitIds(excludedUnitIds);
  }

  selectModule(id: string, check: boolean) {
    this.modules.forEach((module: any) => {
      if (module.id == id) {
        module.units.forEach((unit: any) => {
          unit.isChecked = check;
        });
      }
    });

    const excludedUnitIds = this.units.filter(c => !c.isChecked).map(c => c.id);
    this.dictService.setExcludedUnitIds(excludedUnitIds);
  }


  applyFilters() {
    const excludedUnitIds = this.units.filter(c => !c.isChecked).map(c => c.id);
    this.dictService.setExcludedUnitIds(excludedUnitIds).subscribe(() => {
      // Pass back a value to eventually trigger an update
      this.dismiss(true);
    })
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}