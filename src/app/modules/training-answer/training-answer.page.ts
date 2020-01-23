import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {Config} from "@ionic/angular";
import { MemoMode } from '../../interfaces/memo-mode';
import {TextService} from "../../services/text.service";
import { MediaService} from "../../services/media.service";
import {DictionaryService} from "../../services/dictionary.service";
import {TrainingService} from "../../services/training.service";


@Component({
  selector: 'app-training-answer',
  templateUrl: './training-answer.page.html',
  styleUrls: ['./training-answer.page.scss'],
})
export class TrainingAnswerPage implements OnInit {

  ios: boolean;
  texts: any = {};
  word: any = {};

  itemId: string;
  mode: string;
  showWord: boolean = true;
  showSign: boolean = false;


  constructor(
      public config: Config,
      public textService: TextService,
      public mediaService: MediaService,
      public dictService: DictionaryService,
      public trainService: TrainingService,
      private router: Router,
      private route: ActivatedRoute
  ) { }


  /**
   * Once when page is created
   */
  ngOnInit() {
    this.ios = this.config.get('mode') === 'ios';

    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });

  }

  /**
   * Each time the page is shown
   */
  ionViewWillEnter() {
    this.itemId = this.route.snapshot.paramMap.get('itemId');
    this.mode = this.route.snapshot.paramMap.get('mode');

    this.showWord = (this.mode == MemoMode.SignWord);
    this.showSign = (this.mode == MemoMode.WordSign);

    this.dictService.getWord(this.itemId).subscribe((data: any) => {
      if (data) {
        this.word = data;

        if (this.ios && this.word.videoName) {
          this.mediaService.loadVideo('answerVideoName'+ this.word.id, 'content/'+this.word.videoName);
        }
      }
    });
  }


  finishAnswer(quality) {
    this.trainService.load().subscribe(() => {
      this.trainService.setResult(this.itemId, quality).subscribe(() => {
        this.trainService.getNextQuestion().subscribe((data: any) => {
          if (data.itemId) {
            void this.router.navigate(['/tabs/training/question/' + data.itemId + '/' + data.mode]);
          }
          else {
            void this.router.navigate(['/tabs/training']);
          }
        });
      });
    });
  }
}
