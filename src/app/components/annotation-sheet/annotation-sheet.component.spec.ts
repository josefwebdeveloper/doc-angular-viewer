import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationSheetComponent } from './annotation-sheet.component';

describe('AnnotationSheetComponent', () => {
  let component: AnnotationSheetComponent;
  let fixture: ComponentFixture<AnnotationSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnotationSheetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnotationSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
