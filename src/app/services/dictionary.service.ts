import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { of } from 'rxjs';
import { from } from 'rxjs';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  EXCLUDED_UNIT_IDS = 'excludedUnitIds';

  data: any;
  excludedUnitIds: any;

  constructor(
      public http: HttpClient,
      public storage: Storage
  ) {
  }

  load(): any {
    return forkJoin({
      excludedUnitIds: this.loadExcludedUnitIds(),
      data: this.loadData(),

    })
  }

  loadExcludedUnitIds(): any {
    if (this.excludedUnitIds) {
      return of(this.excludedUnitIds);
    } else {
      // load the filter as early as possible
      return from(this.storage.get(this.EXCLUDED_UNIT_IDS))
          .pipe(map((data: any) => {
            this.excludedUnitIds = data;
            return this.excludedUnitIds;
          }));
    }
  }


  loadData(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
          .get('../../content/data/dictionary.json')
          .pipe(map(this.processData, this));
    }
  }



  /**
   * Process the dictionary data one they are loaded
   * @param data
   */
  processData(data: any) {
    this.data = data;

    // assign the units to the modules
    this.data.modules.forEach((module: any) => {
      module.units = [];
    });
    this.data.units.forEach((unit: any) => {
      var module = this.data.modules.find(
          (s: any) => s.id == unit.module
      );
      if (module) {
        module.units.push(unit);
      }
    });


    // sort the words alphabetically
    this.data.words = this.data.words.sort(function (w1,w2) {
      if (w1.name < w2.name) {
          return -1;
      }
      else if (w1.name > w2.name) {
        return 1;
      }
      else {
        return 0;
      }
    });

    // create alphabetical groups from the words
    this.data.groups = [];
    this.data.words.forEach((word: any) => {
      var letter = word.name.charAt(0).toUpperCase();
      var group = this.data.groups.find(
          (s: any) => s.letter === letter
      );

      if (!group) {
        group = {
          letter: letter,
          words: [word]
        };
        this.data.groups.push(group);
      }
      else {
        group.words.push(word);
      }
    });

    // replace the related word ids with the real words
    this.data.words.forEach((word: any) => {
      let related = [];
      word.relatedWords.forEach((id: any) => {
        let relword =  data.words.find(
            (s: any) => s.id == id)
        if (relword) {
          related.push(relword);
        }
      });
      word.relatedWords = related;
    });

    return this.data;
  }

  /**
   * Set the hidden/shown status of a word by query and excluded units
   * @param word
   * @param queryWords
   * @param excludedUnitIds
   */
  filterWord(
      word: any,
      queryWords: string[],
      excludedUnitIds: any[],
  ) {
    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the words name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (word.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the words units are not in the
    // exclude tracks then this session passes the track test
    let matchesUnits = false;
    word.units.forEach((id: any) => {
      if (excludedUnitIds.indexOf(id) === -1) {
        matchesUnits = true;
      }
    });

    // all tests must be true if it should not be hidden
    word.hide = !(matchesQueryText && matchesUnits);
  }


  /**
   * Get an alphabetically grouped list of words
   * @param queryText
   */
  getDictionary(
      queryText = ''
  ) {
    return this.load().pipe(
        map((joined: any) => {

          queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
          const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

          this.data.groups.forEach((group: any) => {
            group.hide = true;

            group.words.forEach((word: any) => {

              // check if this word should show or not
              this.filterWord(word, queryWords, this.excludedUnitIds);

              // if this word is not hidden then this group should show
              if (!word.hide) {
                group.hide = false;
              }
            });
          });

          return this.data.groups;
        })
    );
  }

  /**
   * Get a list of modules with filter flags in units
   */
  getFilter() {
    return this.load().pipe(
        map((joined: any) => {

          this.data.units.forEach((unit: any) => {
            unit.isChecked = (this.excludedUnitIds.indexOf(unit.id) === -1);
          });
          return this.data.modules;
        })
    );
  }


  getWord(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.words.find(
              (s: any) => s.id == id);
        })
    );
  }

  getModules() {
    return this.loadData().pipe(
        map((data: any) => {
          return data.modules.sort();
        })
    );
  }

  getModule(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.modules.find(
              (s: any) => s.id == id);
        })
    );
  }

  getUnit(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.units.find(
              (s: any) => s.id == id);
        })
    );
  }


  /**
   * Get the ids of excluded units
   */
  getExcludedUnitIds(): any[] {
    return this.loadExcludedUnitIds().pipe(
        map((data: any) => {
          return data;
        })
    );
  }


  /**
   * Store and set the ids of excluded units
   * @param ids
   */
  setExcludedUnitIds(ids: any) {
    this.excludedUnitIds = ids;
    this.storage.set(this.EXCLUDED_UNIT_IDS, ids).then((value) => {
    });
  }

}
