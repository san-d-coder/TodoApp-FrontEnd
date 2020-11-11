import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditComponent } from '../edit/edit.component';
import { TodoListService } from 'src/app/core/Services/todo-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-todo-list',
  templateUrl: './current-todo-list.component.html',
  styleUrls: ['./current-todo-list.component.css']
})
export class CurrentTodoListComponent implements OnInit {

  todos;
  filteredTodos;
  isWait=true;
  isEmpty = false;

  constructor(
    public dialog: MatDialog,
    private _todoListService: TodoListService,
    private _snackBar: MatSnackBar,
    private _router: Router
  ) {

  }

  ngOnInit() {
    this._todoListService.getCurrentTodos().subscribe(
      res => {
        this.isWait = false
        this.todos = res
        this.filteredTodos = this.todos
        if (this.todos.length == 0)
          this.isEmpty = true
        else
          this.isEmpty = false
      },
      err => {
        this.isWait = false
        console.log(err)
      }
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

  editTodo(id) {
    this.dialog.open(EditComponent, {
      width: '400px',
      height: '400px',
      data: id
    })
  }

  onComplete(id) {
    this._todoListService.editTodo(id, {
      "current": false
    }).subscribe(
      res => {
        this._snackBar.open('Marked as Complete', 'Dismiss', {
          duration: 3000
        })
        this._router.navigate(['/todo'])
      },
      err => this._snackBar.open('An error occurred: ' + err.message)
    )
  }


  deleteTodo(id) {
    this._todoListService.editTodo(id, {
      "deleted": true,
      "current": false
    }).subscribe(
      res => {
        this._snackBar.open('Todo deleted', 'Dismiss',{
          duration: 3000
        })
        this._router.navigate(['/todo'])
      },
      err => this._snackBar.open('An error occurred: ' + err.message)
    )
  }
}
