import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardStudentsComponent } from './dashboard-students.component';

describe('DashboardStudentsComponent', () => {
  let component: DashboardStudentsComponent;
  let fixture: ComponentFixture<DashboardStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardStudentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
