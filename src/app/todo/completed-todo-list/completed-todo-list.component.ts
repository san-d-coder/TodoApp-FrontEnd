import { Component, OnInit, DoCheck } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatSnackBar } from '@angular/material';
import { TodoListService } from 'src/app/core/Services/todo-list.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-completed-todo-list',
  templateUrl: './completed-todo-list.component.html',
  styleUrls: ['./completed-todo-list.component.css']
})
export class CompletedTodoListComponent implements OnInit {

  todos;
  searchTerm;
  isWait = true;
  filteredTodos;


  isEmpty = false;

  constructor(public dialog: MatDialog,
    private _todoListService: TodoListService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {

  }


  ngOnInit() {
    this._todoListService.getCompletedTodos().subscribe(
      res => {
        this.isWait = false
        this.todos = res
        this.filteredTodos = this.todos
        if (this.todos.length == 0)
          this.isEmpty = true
        else
          this.isEmpty = false
      }
      ,
      err => {
        this.isWait = false
        console.log(err)
      }
    );

    this.getFilteredElements();
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.todos, event.previousIndex, event.currentIndex);
  }


  deleteTodo(id) {
    this._todoListService.editTodo(id, {
      "deleted": true,
      "current": false
    }).subscribe(
      res => {
        this._snackBar.open('Todo deleted', 'Dismiss',
          {
            duration: 3000
          })
        this._router.navigate(['/todo'])
      },
      err => this._snackBar.open('An error occurred: ' + err.message)
    )
  }

}
