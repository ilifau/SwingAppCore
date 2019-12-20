import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  data: any;

  constructor( public http: HttpClient) { }

  load(): any {
    if (this.data) {
      return of(this.data);
    } else {
      return this.http
          .get('../../content/data/media.json')
          .pipe(map(this.processData, this));
    }
  }

  processData(data: any) {
    this.data = data;
    return this.data;
  }
}
