import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSpaceDetailComponent } from './show-space-detail.component';

describe('ShowSpaceDetailComponent', () => {
  let component: ShowSpaceDetailComponent;
  let fixture: ComponentFixture<ShowSpaceDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShowSpaceDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowSpaceDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
