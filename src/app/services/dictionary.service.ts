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

  KEY_EXCLUDED_UNIT_IDS = 'excludedUnitIds';

  data: any;
  excludedUnitIds: any;

  constructor(
      public http: HttpClient,
      public storage: Storage
  ) {
  }


  /**
   * Load all data from json and storage
   */
  load(): any {
    return forkJoin({
      excludedUnitIds: this.loadExcludedUnitIds(),
      data: this.loadData(),
    })
  }

  /**
   * Load the list of excluded unit ids from the storage
   */
  loadExcludedUnitIds(): any {
    if (this.excludedUnitIds) {
      return of(this.excludedUnitIds);
    } else {
      // load the filter as early as possible
      return from(this.storage.get(this.KEY_EXCLUDED_UNIT_IDS))
          .pipe(map((data: any) => {
            this.excludedUnitIds = data;
            return this.excludedUnitIds;
          }));
    }
  }


  /**
   * Load all words, training module and training unit definitions from a json file
   */
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
   * Process the dictionary data once they are loaded
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
      // if any query word is in the words name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if (word.name.toLowerCase().indexOf(queryWord) > -1) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this session passes the query test
      matchesQueryText = true;
    }

    // if any of the words units are not in the excluded list
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
      queryText = '',
      filterOn = true
  ) {
    return this.load().pipe(
        map((joined: any) => {

          queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
          const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

          this.data.groups.forEach((group: any) => {
            group.hide = true;

            group.words.forEach((word: any) => {

              // check if this word should show or not
              if (filterOn) {
                this.filterWord(word, queryWords, this.excludedUnitIds);
              }
              else {
                this.filterWord(word, queryWords, []);
              }

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

  /**
   * Get the data of single word
   * @param id
   */
  getWord(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.words.find(
              (s: any) => s.id == id);
        })
    );
  }

  /**
   * Get a list of training modules
   */
  getModules() {
    return this.loadData().pipe(
        map((data: any) => {
          return data.modules.sort();
        })
    );
  }

  /**
   * Get the data of a training module
   * @param id
   */
  getModule(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.modules.find(
              (s: any) => s.id == id);
        })
    );
  }

  /**
   * Get the data of a training unit
   * @param id
   */
  getUnit(id: any) {
    return this.loadData().pipe(
        map((data: any) => {
          return data.units.find(
              (s: any) => s.id == id);
        })
    );
  }


  /**
   * Store and set the ids of excluded units
   * @param ids
   */
  setExcludedUnitIds(ids: any) {
    this.excludedUnitIds = ids;
    this.storage.set(this.KEY_EXCLUDED_UNIT_IDS, ids).then((value) => {
    });
  }


  /**
   * Get the current list of word ids that match the units filter
   */
  getFilteredWordIds() {
    return this.load().pipe(
        map((data: any) => {
          let filteredWordIds = [];

          this.data.words.forEach((word: any) => {
            // if any of the words units are not in the excluied list
            let matchesUnits = false;
            word.units.forEach((id: any) => {
              if (this.excludedUnitIds.indexOf(id) === -1) {
                matchesUnits = true;
              }
            });
            if (matchesUnits) {
              filteredWordIds.push(word.id);
             }
          });
          return filteredWordIds;
        })
    );
  }
}
