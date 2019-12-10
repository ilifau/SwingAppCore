import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: 'dictionary.page.html',
  styleUrls: ['dictionary.page.scss']
})
export class DictionaryPage implements OnInit {

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
