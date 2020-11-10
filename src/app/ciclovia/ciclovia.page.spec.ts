import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CicloviaPage } from './ciclovia.page';

describe('CicloviaPage', () => {
  let component: CicloviaPage;
  let fixture: ComponentFixture<CicloviaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CicloviaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CicloviaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
