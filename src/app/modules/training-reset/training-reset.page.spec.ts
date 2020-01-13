import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrainingResetPage } from './training-reset.page';

describe('TrainingResetPage', () => {
  let component: TrainingResetPage;
  let fixture: ComponentFixture<TrainingResetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingResetPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrainingResetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
