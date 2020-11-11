import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTodoListComponent } from './current-todo-list.component';

describe('CurrentTodoListComponent', () => {
  let component: CurrentTodoListComponent;
  let fixture: ComponentFixture<CurrentTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
