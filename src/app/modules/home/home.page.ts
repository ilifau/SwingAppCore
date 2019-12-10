import { Component, OnInit } from '@angular/core';
import { TextService } from '../../services/text.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

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
