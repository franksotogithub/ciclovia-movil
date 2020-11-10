import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EsriMapPage } from './esri-map.page';

describe('EsriMapPage', () => {
  let component: EsriMapPage;
  let fixture: ComponentFixture<EsriMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsriMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EsriMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
