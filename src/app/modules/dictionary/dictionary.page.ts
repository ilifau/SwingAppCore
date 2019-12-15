import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, ModalController, Config } from '@ionic/angular';

import { TextService } from '../../services/text.service';
import { DictionaryService } from '../../services/dictionary.service';
import { FilterPage } from '../../components/filter/filter.page';

@Component({
  selector: 'app-dictionary',
  templateUrl: 'dictionary.page.html',
  styleUrls: ['dictionary.page.scss']
})
export class DictionaryPage implements OnInit {

  // Gets a reference to the list element
  @ViewChild('wordList', { static: true }) wordList: IonList;

  ios: boolean;
  queryText = '';
  excludedUnitIds: any = [];
  shownGroups: number;
  groups: any = [];
  texts: any = {};

  constructor(
      public modalCtrl: ModalController,
      public router: Router,
      public config: Config,

      public textService: TextService,
      public dictService: DictionaryService
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    this.updateWords();
    this.ios = this.config.get('mode') === 'ios';
  }

  updateWords() {
    // Close any open sliding items when the schedule updates
    if (this.wordList) {
      this.wordList.closeSlidingItems();
    }

    this.dictService.getDictionary(this.queryText, this.excludedUnitIds).subscribe((data: Array<Object>) => {
        this.groups = data;
        this.shownGroups = data.length;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { excludedUnitIds: this.excludedUnitIds }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludedUnitIds = data;
      this.updateWords();
    }
  }
}
