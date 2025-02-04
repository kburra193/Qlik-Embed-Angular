import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QlikSpacesComponent } from './qlik-spaces.component';

describe('QlikSpacesComponent', () => {
  let component: QlikSpacesComponent;
  let fixture: ComponentFixture<QlikSpacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QlikSpacesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(QlikSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
