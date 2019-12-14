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
          .get('../../content/data/texts.json')
          .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    this.data = data;
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
    word.tracks.forEach((id: number) => {
      if (excludedUnitIds.indexOf(id) === -1) {
        matchesUnits = true;
      }
    });

    // all tests must be true if it should not be hidden
    word.hide = !(matchesQueryText && matchesUnits);
  }


  getFilteredWords(
      queryText = '',
      excludedUnitIds: any[] = [],
  ) {
    return this.load().pipe(
        map((data: any) => {

          queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
          const queryWords = queryText.split(' ').filter(w => !!w.trim().length);

          data.words.forEach((word: any) => {
            this.filterWord(word, queryWords, excludedUnitIds);
          });

          return data.words;
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

}
