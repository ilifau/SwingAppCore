import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictionaryService } from './dictionary.service';
import { MemoItem } from '../interfaces/memo-item';
import { MemoStatus } from '../interfaces/memo-status';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private status: MemoStatus;
  private wordIds: Array<string>;

  KEY_TRAINING_STATUS = 'trainingStatus';

  constructor(
      public storage: Storage,
      public dictService: DictionaryService,
  ) {}

  /**
   * Load training status and current words
   */
  public load(): any {
    return forkJoin({
      wordIds: this.loadWordIds(),
      data: this.loadStatus(),
    }).pipe(map(this.prepareData, this));
  }

  /**
   * Load the training status
   */
  private loadStatus(): any {
    if (this.status) {
      return of(this.status);
    } else {
      // load the status
      return from(this.storage.get(this.KEY_TRAINING_STATUS))
          .pipe(map((data: any) => {

            if (!data) {
              this.status = {
                items: [],
                today: '1900-01-01',
                new: [],
                review: [],
                repeat: []
              }
            }
            else {
              this.status = data;
            }

          }));
    }
  }

  /**
   * Load the current list of word ids
   * (always get from dictionary service because filter may have changed)
   */
  private loadWordIds(): any {
    return this.dictService.getFilteredWordIds()
        .pipe(map((data: Array<string>) => {
          this.wordIds = data;
        }));
  }


  /**
   * Prepare the training data
   */
  private prepareData() {

    let today = this.dateToString(new Date());

    // check current date and reset working list on a new day
    if (this.status.today !== today) {
      this.status.today = today;
      this.status.repeat = [];
    }
  }


  private filterWords() {

    // add new items
    this.wordIds.forEach((id: string) => {
      let index = this.status.items.findIndex((item: MemoItem) => {
        return item.id == id;
      });
      if (index == -1) {
          this.status.items.push( {
            id: id,
            views: 0,
            lastDay: '',
            lastScore: 0,
            factor: 0,
            interval: 0,
            nextDay: ''
          });
      }
    });

    // cleanup todays training


  }



  /**
   * get a date sting like '2020-01-10'
   * @param date
   */
  private dateToString(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    return year + '-' + month + '-' + day;
  }

  private dateFromString(string: string) {
    let parts = string.split('-');

    let year = +parts[0];       // cast to number
    let month = +parts[1] - 1;  // month index is 0
    let day = +parts[2];

    return new Date(year, month, day);
  }


}
