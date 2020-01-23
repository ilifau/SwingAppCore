import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Config} from "@ionic/angular";
import { TextService} from "../../services/text.service";
import { MediaService} from "../../services/media.service";
import { DictionaryService} from "../../services/dictionary.service";

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
      public mediaService: MediaService,
      public dictService: DictionaryService,

  ) { }

  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    const wordId = this.route.snapshot.paramMap.get('wordId');

    this.dictService.getWord(wordId).subscribe((data: any) => {
      this.word = data;

      if (this.ios && this.word.videoName) {
        this.mediaService.loadVideo('dictVideoName'+ this.word.id, 'content/'+this.word.videoName);
      }
      if (this.ios && this.word.videoDesc) {
        this.mediaService.loadVideo('dictVideoDesc'+ this.word.id, 'content/'+this.word.videoDesc);
      }
    });
  }
}
