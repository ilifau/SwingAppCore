import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePrivacyPage } from './home-privacy.page';

describe('HomePrivacyPage', () => {
  let component: HomePrivacyPage;
  let fixture: ComponentFixture<HomePrivacyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePrivacyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePrivacyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
