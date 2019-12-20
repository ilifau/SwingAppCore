import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdditionalModulePage } from './additional-module.page';

describe('AdditionalModulePage', () => {
  let component: AdditionalModulePage;
  let fixture: ComponentFixture<AdditionalModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalModulePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
