import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralDescriptionComponent } from './general-description.component';

describe('GeneralDescriptionComponent', () => {
  let component: GeneralDescriptionComponent;
  let fixture: ComponentFixture<GeneralDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralDescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
