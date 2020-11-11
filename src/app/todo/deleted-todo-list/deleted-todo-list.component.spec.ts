import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedTodoListComponent } from './deleted-todo-list.component';

describe('DeletedTodoListComponent', () => {
  let component: DeletedTodoListComponent;
  let fixture: ComponentFixture<DeletedTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletedTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletedTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
