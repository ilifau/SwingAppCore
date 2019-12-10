import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text.service';

@Component({
  selector: 'app-training',
  templateUrl: 'training.page.html',
  styleUrls: ['training.page.scss']
})
export class TrainingPage implements OnInit {

  texts: any = {};

  constructor(
      public textService: TextService
  ) {}

  ngOnInit() {
    this.textService.load().subscribe((data: any) => {
      this.texts = data;
    });
  }

}
