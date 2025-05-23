import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseEditComponent } from './license-edit.component';

describe('LicenseEditComponent', () => {
  let component: LicenseEditComponent;
  let fixture: ComponentFixture<LicenseEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
