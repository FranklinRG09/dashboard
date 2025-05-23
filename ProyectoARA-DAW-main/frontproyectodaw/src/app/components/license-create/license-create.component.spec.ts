import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseCreateComponent } from './license-create.component';

describe('LicenseCreateComponent', () => {
  let component: LicenseCreateComponent;
  let fixture: ComponentFixture<LicenseCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
