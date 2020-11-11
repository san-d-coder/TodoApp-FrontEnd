import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TodoListService } from 'src/app/core/Services/todo-list.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleted-todo-list',
  templateUrl: './deleted-todo-list.component.html',
  styleUrls: ['./deleted-todo-list.component.css']
})
export class DeletedTodoListComponent implements OnInit {

  todos;
  filteredTodos;
  isEmpty = false;

  constructor(private _todoListService: TodoListService,
    private _snackBar: MatSnackBar,
    private _router: Router) { }

  ngOnInit() {
    this._todoListService.getDeletedTodos().subscribe(
      res => {
        this.todos = res
        this.filteredTodos = this.todos
        if (this.todos.length == 0)
          this.isEmpty = true
        else
          this.isEmpty = false
      },
      err => console.log(err)
    );

    this.getFilteredElements();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }

  getFilteredElements() {
    this._todoListService.searchTerm$.subscribe(
      searchTerm => {
        if (searchTerm == '')
          this.filteredTodos = this.todos
        else {
          this.filteredTodos = this.filterTodos(searchTerm)
        }
      }
    )
  }


  filterTodos(searchTerm) {
    return this.todos.filter(
      todo => todo.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1);

  }
  clearTodo(id) {
    this._todoListService.deleteTodo(id).subscribe(
      res => {
        this._snackBar.open('Cleared', 'Dismiss', {
          duration: 3000
        })
        this._router.navigate(['/todo'])
      },
      err => this._snackBar.open('An error occurred: ' + err.message)
    )
  }

}
