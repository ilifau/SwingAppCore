import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditionalPage } from './additional.page';

describe('AdditionalPage', () => {
  let component: AdditionalPage;
  let fixture: ComponentFixture<AdditionalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
