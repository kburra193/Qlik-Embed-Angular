import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllQlikAppsComponent } from './view-all-qlik-apps.component';

describe('ViewAllQlikAppsComponent', () => {
  let component: ViewAllQlikAppsComponent;
  let fixture: ComponentFixture<ViewAllQlikAppsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAllQlikAppsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAllQlikAppsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
