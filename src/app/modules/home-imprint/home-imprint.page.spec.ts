import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeImprintPage } from './home-imprint.page';

describe('HomeImprintPage', () => {
  let component: HomeImprintPage;
  let fixture: ComponentFixture<HomeImprintPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeImprintPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeImprintPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
