import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditionalAboutPage } from './additional-about.page';

describe('AdditionalAboutPage', () => {
  let component: AdditionalAboutPage;
  let fixture: ComponentFixture<AdditionalAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalAboutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
