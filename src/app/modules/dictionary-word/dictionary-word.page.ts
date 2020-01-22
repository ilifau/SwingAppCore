import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config} from "@ionic/angular";
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-dictionary-word',
  templateUrl: './dictionary-word.page.html',
  styleUrls: ['./dictionary-word.page.scss'],
})
export class DictionaryWordPage implements OnInit {

  ios: boolean;
  word: any = {};
  texts: any = {};


  constructor(
      public config: Config,
      private route: ActivatedRoute,
      public textService: TextService,
      public dictService: DictionaryService,

  ) { }

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    const wordId = this.route.snapshot.paramMap.get('wordId');

    this.dictService.getWord(wordId).subscribe((data: any) => {
      this.word = data;
      this.getVideo();
    });

    this.ios = this.config.get('mode') === 'ios';
  }

  /**
   * Each time the page is shown
   */
  ionViewWillEnter() {

  }


  getVideo() {
    var xhr = new XMLHttpRequest();
    var word = this.word;
    xhr.open('GET', 'content/'+ word.videoName, true);
    xhr.responseType = 'blob'; //important
    xhr.onload = function(e) {
      if (this.status == 200) {
        console.log("loaded");
        var blob = this.response;
        var video:any = document.getElementById('dictionaryVideo'+ word.id);
        video.oncanplaythrough = function() {
          console.log("Can play through video without stopping");
          URL.revokeObjectURL(this.src);
        };
        video.src = URL.createObjectURL(blob);
        video.load();
      }
    };
    xhr.send();
  }

}
