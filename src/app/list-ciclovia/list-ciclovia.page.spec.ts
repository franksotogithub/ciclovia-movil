import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCicloviaPage } from './list-ciclovia.page';

describe('ListCicloviaPage', () => {
  let component: ListCicloviaPage;
  let fixture: ComponentFixture<ListCicloviaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCicloviaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCicloviaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
