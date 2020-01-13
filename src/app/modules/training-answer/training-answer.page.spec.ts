import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingAnswerPage } from './training-answer.page';

describe('TrainingAnswerPage', () => {
  let component: TrainingAnswerPage;
  let fixture: ComponentFixture<TrainingAnswerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingAnswerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingAnswerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
