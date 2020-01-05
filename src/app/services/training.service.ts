import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { DictionaryService } from './dictionary.service';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  status: any;
  wordIds: any;

  KEY_TRAINING_STATUS = 'trainingStatus';

  constructor(
      public storage: Storage,
      public dictService: DictionaryService,
  ) {}

  /**
   * Load training status and current words
   */
  load(): any {
    return forkJoin({
      wordIds: this.loadWordIds(),
      data: this.loadStatus(),
    })
  }

  /**
   * Load the training status
   */
  loadStatus(): any {
    if (this.status) {
      return of(this.status);
    } else {
      // load the status
      return from(this.storage.get(this.KEY_TRAINING_STATUS))
          .pipe(map(this.prepareStatus, this));
    }
  }

  /**
   * Prepare the training status if it is not yet initialized
   */
  prepareStatus(data: any) {
    this.status = data;

  // check current date and reset working list on a new day


  }



  /**
   * Load the current list of word ids
   * (always get from dictionary service because filter may have changed)
   */
  loadWordIds(): any {
    return this.dictService.getFilteredWordIds()
        .pipe(map((data: any) => {
          this.status = data;
          return this.status;
        }));
  }

}
