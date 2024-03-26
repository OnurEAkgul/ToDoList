import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminToDoListTableComponent } from './admin-to-do-list-table.component';

describe('AdminToDoListTableComponent', () => {
  let component: AdminToDoListTableComponent;
  let fixture: ComponentFixture<AdminToDoListTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminToDoListTableComponent]
    });
    fixture = TestBed.createComponent(AdminToDoListTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
