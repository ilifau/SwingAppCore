import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeAboutPage } from './home-about.page';

describe('HomeAboutPage', () => {
  let component: HomeAboutPage;
  let fixture: ComponentFixture<HomeAboutPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAboutPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeAboutPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
