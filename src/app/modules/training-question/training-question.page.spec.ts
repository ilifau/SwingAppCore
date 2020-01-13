import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingQuestionPage } from './training-question.page';

describe('TrainingQuestionPage', () => {
  let component: TrainingQuestionPage;
  let fixture: ComponentFixture<TrainingQuestionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingQuestionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingQuestionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
