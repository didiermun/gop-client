import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCardComponent } from './r-card.component';

describe('RCardComponent', () => {
  let component: RCardComponent;
  let fixture: ComponentFixture<RCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
