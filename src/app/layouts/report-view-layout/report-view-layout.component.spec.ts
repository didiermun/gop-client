import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportViewLayoutComponent } from './report-view-layout.component';

describe('ReportViewLayoutComponent', () => {
  let component: ReportViewLayoutComponent;
  let fixture: ComponentFixture<ReportViewLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportViewLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportViewLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
