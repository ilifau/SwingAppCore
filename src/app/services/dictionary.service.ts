import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {
  data: any;

  constructor(public http: HttpClient) {}

  load(): any {
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

    return this.data;
  }

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
   * @param excludedUnitIds
   */
  getDictionary(
      queryText = '',
      excludedUnitIds: any[] = [],
  ) {
    return this.load().pipe(
        map((data: any) => {

          queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
          const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

          data.groups.forEach((group: any) => {
            group.hide = true;

            group.words.forEach((word: any) => {

              // check if this word should show or not
              this.filterWord(word, queryWords, excludedUnitIds);

              // if this word is not hidden then this group should show
              if (!word.hide) {
                group.hide = false;
              }
            });
          });

          return data.groups;
        })
    );
  }

  getWords() {
    return this.load().pipe(
        map((data: any) => {
          return data.modules.sort();
        })
    );
  }

  getUnits() {
    return this.load().pipe(
        map((data: any) => {
          return data.units.sort();
        })
    );
  }

  getModules() {
    return this.load().pipe(
        map((data: any) => {
          return data.modules.sort();
        })
    );
  }

  getWord(id: any) {
    return this.load().pipe(
        map((data: any) => {
          const word =  data.words.find(
              (s: any) => s.id == id)

          console.log(word);

          return word;
        })
    );
  }

}
