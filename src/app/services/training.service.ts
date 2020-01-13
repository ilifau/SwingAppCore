import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {forkJoin, from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {DictionaryService} from './dictionary.service';
import {MemoItem} from '../interfaces/memo-item';
import {MemoResult} from '../interfaces/memo-result';
import {MemoMode} from '../interfaces/memo-mode';
import {MemoStatus} from '../interfaces/memo-status';
import {MemoOverview} from '../interfaces/memo-overview';
import {environment} from '../../environments/environment';

declare function supermemo2(quality: number, lastSchedule: number, lastFactor: number): MemoResult;

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  private status: MemoStatus;
  private wordIds: Array<string>;

  private KEY_TRAINING_STATUS = 'trainingStatus';
  private MAX_NEW_ITEMS_PER_DAY = 5;
  private MAX_REVIEW_ITEMS_PER_DAY = 50;

  constructor(
      public storage: Storage,
      public dictService: DictionaryService,
  ) {}


  /**
   * Get a statistical overview
   */
  public getOverview(): Observable<MemoOverview> {
    return this.load().pipe(
        map(() => {
          return<MemoOverview> {
            trainDate: this.dayToDate(this.status.trainDay).toLocaleDateString(),
            totalCount: this.wordIds.length,
            trainedCount: this.countTrainedItems(),
            untrainedCount: this.wordIds.length - this.countTrainedItems(),
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
  public getItem(id: string): Observable<MemoItem> {
    return this.load().pipe(
        map(() => {
          return<MemoItem> this.status.items.find((item: MemoItem) => {
            return item.id == id;
          });
        })
    );
  }

  /**
   * Get the id of the next item to learn
   */
  public getNextQuestion(trainMode?: MemoMode): Observable<any> {
    return this.load().pipe(
        map(() => {

          // save a forced train mode (when training is started)
          if (trainMode) {
            this.status.trainMode = trainMode;
            this.save();
          }

          // get the actual training mode for the next question
          let mode = this.status.trainMode;
          if (mode == MemoMode.Random) {
            if (Math.random() < 0.5) {
              mode = MemoMode.WordSign;
            }
            else {
              mode = MemoMode.SignWord;
            }
          }

          if (this.status.reviewIds.length > 0) {
            return {
              'itemId': this.status.reviewIds[0],
              'mode': mode,
            };
          }
          else if (this.status.newIds.length > 0) {
            return {
              'itemId': this.status.newIds[0],
              'mode': mode,
            };
          }
          else if (this.status.repeatIds.length > 0) {
            return {
              'itemId': this.status.repeatIds[0],
              'mode': mode,
            };
          }
          else {
            return {
              'itemId': null,
              'mode': mode,
            };
          }
        })
    );
  }

  /**
   * Save the training result for an item
   * Apply the supermemo algorithm
   */
  public setResult(itemId: string, quality: number): Observable<any> {



    let item: MemoItem = this.status.items.find((item: MemoItem) => {
      return item.id == itemId;
    });

    if (typeof item === 'undefined') {
      this.removeItemId(this.status.newIds, itemId);
      this.removeItemId(this.status.reviewIds, itemId);
      this.removeItemId(this.status.repeatIds, itemId);
      return this.save();
    }

    if (this.status.newIds.indexOf(itemId) > 0) {
      this.removeItemId(this.status.newIds, itemId);
      this.applySuperMemo2(item, quality);
    }
    else if (this.status.reviewIds.indexOf(itemId) > 0) {
      this.removeItemId(this.status.reviewIds, itemId);
      this.applySuperMemo2(item, quality);
    }
    else if (this.status.repeatIds.indexOf(itemId) > 0) {
        this.removeItemId(this.status.repeatIds, itemId);   // remove from the beginning
    }

    if (quality < 4) {
      this.status.repeatIds.push(itemId);                   // add to the end
    }
    return this.save();
  }

  /**
   * Increase the current day (for testing purposes)
   */
  public setNextDay(): Observable<any> {
    let date = this.dayToDate(this.status.testDay);
    date.setDate(date.getDate() + 1);
    this.status.testDay = this.dayFromDate(date);
    return this.save();
  }

  /**
   * Reset all training items and lists
   */
  public resetTrainingStatus(): Observable<any> {
    this.status = this.getInitialStatus();
    return this.save();
  }


  /**
   * Apply the supermemo 2 algorithm to an item
   */
  private applySuperMemo2(item: MemoItem, quality: number) {
    let result: MemoResult = supermemo2(quality, item.schedule, item.factor);

    item.schedule = result.schedule;
    item.factor = result.factor;
    item.lastDay = this.getToday();
    item.lastScore = quality;

    let nextDate = this.dayToDate(item.lastDay);
    nextDate.setDate(nextDate.getDate() + item.schedule);
    item.nextDay = this.dayFromDate(nextDate);
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
      trainMode: MemoMode.Random,
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
      factor: 2.5,
      schedule: null, // this indicates supermemo2 that the item is not yet trained
      nextDay: ''
    }
  }

  /**
   * Load training status and current words
   */
  public load(): Observable<any> {
    return forkJoin({
      wordIds: this.loadWordIds(),
      data: this.loadStatus(),
    }).pipe(map(this.prepareData, this));
  }

  /**
   * Save the training status
   */
  private save(): Observable<any> {
    return of(this.storage.set(this.KEY_TRAINING_STATUS, this.status));
  }

  /**
   * Load the training status
   */
  private loadStatus(): Observable<any> {
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
  private loadWordIds(): Observable<any> {
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
    let removed;

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

    // check if filter has changed and modify the lists for today
    removed = this.removeMissingWordIds(this.status.newIds);
    if (removed > 0) {
      this.findNewIds(removed);
      changed = true;
    }
    removed = this.removeMissingWordIds(this.status.reviewIds);
    if (removed > 0) {
      this.findReviewIds(removed);
      changed = true;
    }
    removed = this.removeMissingWordIds(this.status.repeatIds);
    if (removed > 0) {
      changed = true;
    }

    if (changed) {
      this.save();
    }
  }

  /**
   * Remove missing words from a list
   * @return number
   */
  private removeMissingWordIds(list: Array<string>) {
    let removed = 0;
    for( let i = 0; i < list.length; i++){
      if ( this.wordIds.indexOf(list[i]) < 0) {
        list.splice(i, 1);
        removed++;
      }
    }
    return removed;
  }

  /**
   * Remove an item id from a list
   */
  private removeItemId(list: Array<string>, id: string) {
    let i = list.indexOf(id);
    if (i >= 0) {
      list.splice(i, 1);
    }
  }


  /**
   * Find new items for today
   */
  private findNewIds(max: number) {
    let count: number = 0;

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
   */
  private findReviewIds(max: number) {
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
   * Get a day string like '2020-01-10' from a date object
   */
  private dayFromDate(date: Date): string {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let monthday = date.getDate();

    return year + '-' + month + '-' + monthday;
  }


  /**
   * Get a date object from a day sting like '2020-01-10'
   */
  private dayToDate(day: string): Date {
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
  private dayInterval(day1: string, day2: string): number {

    let date1 = this.dayToDate(day1);
    let date2 = this.dayToDate(day2);

    // getTime provides milliseconds
    return Math.round((date2.getTime() - date1.getTime()) / 86400000);
  }
}
