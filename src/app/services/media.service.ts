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

  /**
   * Load a Video to its tag
   * This was proposed here to prevent a download (#13):
   * https://stackoverflow.com/questions/9756837/prevent-html5-video-from-being-downloaded-right-click-saved
   *
   * Modified according (#8):
   * https://stackoverflow.com/questions/8022425/getting-blob-data-from-xhr-request
   *
   * It can also be used to solve the issue with safaris media queries which are not supported by the service worker
   * https://github.com/angular/angular/issues/30860
   *
   * @param elementId
   * @param srcUrl
   */
  loadVideo(elementId, srcUrl) {

    //console.log("load " + elementId + ' from ' + srcUrl);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', srcUrl, true);
    xhr.responseType = 'blob'; //important
    //xhr.responseType = 'arraybuffer'; //important
    xhr.onload = function(e) {
      if (this.status == 200) {
        //console.log("loaded " + srcUrl);
        let blob = new Blob([this.response], {type: 'video/mp4'});
        let video:any = document.getElementById(elementId);
        let fileReader = new FileReader();
        fileReader.readAsDataURL(blob);
        fileReader.onloadend = function() {
          alert('show source in ' + video.id);
          video.src = fileReader.result;
        }
        // let code = btoa(String.fromCharCode.apply(null, new Uint8Array(this.response)));
        // let video:any = document.getElementById(elementId);
        // alert('show source in ' + video.id);
        // video.src = "data:video/mp4;base64,"+code;
        video.load();
      }
    };
    xhr.send();
  }
}
