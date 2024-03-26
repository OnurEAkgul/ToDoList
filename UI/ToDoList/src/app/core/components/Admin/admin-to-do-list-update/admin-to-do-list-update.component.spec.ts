import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToDoListUpdateComponent } from './admin-to-do-list-update.component';

describe('AdminToDoListUpdateComponent', () => {
  let component: AdminToDoListUpdateComponent;
  let fixture: ComponentFixture<AdminToDoListUpdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminToDoListUpdateComponent]
    });
    fixture = TestBed.createComponent(AdminToDoListUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
