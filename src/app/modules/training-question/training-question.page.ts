import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Config} from "@ionic/angular";
import { MemoMode } from '../../interfaces/memo-mode';
import {TextService} from "../../services/text.service";
import {DictionaryService} from "../../services/dictionary.service";

@Component({
  selector: 'app-training-question',
  templateUrl: './training-question.page.html',
  styleUrls: ['./training-question.page.scss'],
})
export class TrainingQuestionPage implements OnInit {

  ios: boolean;
  texts: any = {};
  word: any = {};

  itemId: string;
  mode: string;
  showWord: boolean = true;
  showSign: boolean = false;


  constructor(
      public config: Config,
      private route: ActivatedRoute,
      public textService: TextService,
      public dictService: DictionaryService,
  ) { }


  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.showWord = (this.mode == MemoMode.WordSign);
    this.showSign = (this.mode == MemoMode.SignWord);

    this.dictService.getWord(this.itemId).subscribe((data: any) => {
      if (data) {
        this.word = data;
      }
    });
  }

}
