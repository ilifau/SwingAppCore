import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictionaryService } from './dictionary.service';
import { MemoItem } from '../interfaces/memo-item';
import { MemoStatus } from '../interfaces/memo-status';
import { MemoOverview } from '../interfaces/memo-overview';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private status: MemoStatus;
  private wordIds: Array<string>;

  private KEY_TRAINING_STATUS = 'trainingStatus';
  private MAX_NEW_ITEMS_PER_DAY = 10;
  private MAX_REVIEW_ITEMS_PER_DAY = 50;

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
   * Save the training status
   */
  public save() {
    this.storage.set(this.KEY_TRAINING_STATUS, this.status).then((value) => {})
  }

  /**
   * Get a statistical overview
   */
  public getOverview(): any {
    return this.load().pipe(
        map((data: any) => {
          return<MemoOverview> {
            trainDay: this.status.trainDay,
            totalCount: this.wordIds.length,
            trainedCount: this.countTrainedItems(),
            newCount: this.status.newIds.length,
            reviewCount: this.status.repeatIds.length,
            repeatCount: this.status.repeatIds.length
          }
        })
    );
  }

  /**
   * Get the status data of a single item
   * @param id
   */
  public getItem(id: string): any {
    return this.load().pipe(
        map((data: any) => {
          return<MemoItem> this.status.items.find((item: MemoItem) => {
            return item.id == id;
          });
        })
    );
  }

  /**
   * Get the id of the next item to learn
   */
  public nextItemId(): any {
    return this.load().pipe(
        map((data: any) => {
          if (this.status.reviewIds.length > 0) {
            return this.status.reviewIds[0];
          }
          else if (this.status.newIds.length > 0) {
            return this.status.newIds[0];
          }
          else if (this.status.repeatIds.length > 0) {
            return this.status.repeatIds[0];
          }
          else {
            return '';
          }
        })
    );
  }



  /**
   * Increase the current day (for testing purposes
   */
  public shiftToday() {
    let date = this.dayToDate(this.status.testDay);
    date.setDate(date.getDate() + 1);
    this.status.testDay = this.dayFromDate(date);
    this.save();
  }

  /**
   * Get the current day
   * - returns the current day in production environment
   * - returns the stored test day in developing environment
   */
  private getToday(): string {
    if (environment.production) {
      return this.dayFromDate(new Date());
    }
    else {
      return this.status.testDay;
    }
  }


  /**
   * Get the number of already trained items
   */
  private countTrainedItems(): any {
    let count = 0;
    this.status.items.forEach((item: MemoItem) => {
      if (item.views > 0 && this.wordIds.indexOf(item.id) >= 0) {
        count++;
      }
    });
    return count;
  }

  /**
   * Get an initial status
   */
  private getInitialStatus(): MemoStatus {
    return {
      items: [],
      testDay: this.dayFromDate(new Date()),
      trainDay: '',
      newIds: [],
      reviewIds: [],
      repeatIds: []
    }
  }

  /**
   * Get an initial item for an id
   */
  private getInitialItem(id: string): MemoItem {
    return {
      id: id,
      views: 0,
      lastDay: '',
      lastScore: 0,
      factor: 0,
      interval: 0,
      nextDay: ''
    }
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
              this.status = this.getInitialStatus();
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
    let changed = false;

    // add new items for new word ids in the filter
    this.wordIds.forEach((id: string) => {
      let index = this.status.items.findIndex((item: MemoItem) => {
        return item.id == id;
      });
      if (index == -1) {
        this.status.items.push(this.getInitialItem(id));
      }
      changed = true;
    });

    // check current date and reset the working list on a new day
    this.status.testDay  = this.getToday();
    if (this.status.trainDay !== this.status.testDay) {
      this.status.trainDay = this.status.testDay;
      this.status.repeatIds = [];
      this.findReviewIds(this.MAX_REVIEW_ITEMS_PER_DAY);
      this.findNewIds(this.MAX_NEW_ITEMS_PER_DAY);
      changed = true;
    }

    // check if filter has changed and replace new items for today
    let removed = 0;
    for( let i = 0; i < this.status.newIds.length; i++){
      if ( this.wordIds.indexOf(this.status.newIds[i]) < 0) {
        this.status.newIds.splice(i, 1);
        removed++;
      }
    }
    if (removed > 0) {
      this.findNewIds(removed);
      changed = true;
    }

    // check if filter has changed and replace items to review today
    removed = 0;
    for( let i = 0; i < this.status.reviewIds.length; i++){
      if ( this.wordIds.indexOf(this.status.reviewIds[i]) < 0) {
        this.status.reviewIds.splice(i, 1);
        removed++;
      }
    }
    if (removed > 0) {
      this.findReviewIds(removed);
      changed = true;
    }

    // save the prepared status

    if (changed) {
      this.save();
    }
  }



  /**
   * Find new items for today
   * @param max
   */
  private findNewIds(max: number) {
    let ids = [];
    let count: number = 0;
    let today:string = this.dayFromDate(new Date());

    this.status.items.forEach((item: MemoItem) => {
        if (count < max
            && item.views == 0
            && this.wordIds.indexOf(item.id) >=0
            && this.status.newIds.indexOf(item.id) < 0

        ) {
          this.status.newIds.push(item.id);
          count++;
        }
    });
  }

  /**
   * Find items to review today
   * @param max
   */
  private findReviewIds(max: number) {
    let ids = [];
    let count: number = 0;
    let today:string = this.dayFromDate(new Date());

    this.status.items.forEach((item: MemoItem) => {
      if (count < max
          && this.wordIds.indexOf(item.id) >=0
          && this.status.reviewIds.indexOf(item.id) < 0
          && this.dayInterval(item.nextDay, today) >= 0
      ) {
        this.status.reviewIds.push(item.id);
        count++;
      }
    });
  }

  /**
   * get a day string like '2020-01-10' from a date object
   * @param date Date
   * @return string
   */
  private dayFromDate(date: Date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthday = date.getDate();

    return year + '-' + month + '-' + monthday;
  }

  /**
   * Get a date object from a day sting like '2020-01-10'
   * @param day string
   * @return Date
   */
  private dayToDate(day: string) {
    let parts = day.split('-');

    let year = +parts[0];       // cast to number
    let month = +parts[1] - 1;  // month index is 0
    let monthday = +parts[2];

    return new Date(year, month, monthday);
  }

  /**
   * Gat the interval between two days
   * @param day1 string   '2020-01-01'
   * @param day2 string   '2020-01-02'
   * @return number       days from day1 to day2 (negative if day2 is earlier)
   */
  private dayInterval(day1: string, day2: string) {

    let date1 = this.dayToDate(day1);
    let date2 = this.dayToDate(day2);

    // getTime provides milliseconds
    return Math.round((date2.getTime() - date1.getTime()) / 86400000);
  }
}
