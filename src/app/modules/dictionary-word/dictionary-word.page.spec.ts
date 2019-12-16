import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DictionaryWordPage } from './dictionary-word.page';

describe('DictionaryWordPage', () => {
  let component: DictionaryWordPage;
  let fixture: ComponentFixture<DictionaryWordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DictionaryWordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DictionaryWordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
