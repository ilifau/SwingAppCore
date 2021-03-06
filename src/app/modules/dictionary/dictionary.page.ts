import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonList, ModalController, Config } from '@ionic/angular';

import { TextService } from '../../services/text.service';
import { DictionaryService } from '../../services/dictionary.service';
import { FilterPage } from '../filter/filter.page';

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
  filterOn = true;
  shownGroups = -1;
  groups: any = [];
  texts: any = {};

  constructor(
      public modalCtrl: ModalController,
      public router: Router,
      public config: Config,

      public textService: TextService,
      public dictService: DictionaryService
  ) {}

  /**
   * One when page is created
   */
  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

  /**
   * Each time the page is shown
   */
  ionViewWillEnter() {
    this.updateWords();
  }


  updateWords() {
    if (this.queryText.length > 0) {
      this.filterOn = false;
    }
    this.dictService.getDictionary(this.queryText, this.filterOn).subscribe((data: Array<Object>) => {
        this.groups = data;
        this.shownGroups = data.length;
    });
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: FilterPage,
      componentProps: { }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.filterOn = true;
      this.updateWords();
    }
  }
}
