import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerRequestListComponent } from './worker-request-list.component';

describe('WorkerRequestListComponent', () => {
  let component: WorkerRequestListComponent;
  let fixture: ComponentFixture<WorkerRequestListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkerRequestListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkerRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
