import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/core/Services/todo-list.service';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createTodoForm;
  errorMessage;
  minDate: Date;
  maxDate: Date;

  constructor(private _todoListService: TodoListService,
              private _snackbar: MatSnackBar,
              private _formBuilder: FormBuilder,
              private _router: Router) 
    {
      this.createTodoForm = this._formBuilder.group({
      name: ['',Validators.required],
      description: ['',Validators.required],
      dueDate: ['',Validators.required],
      current: true,
      deleted: false
    })

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDate = new Date().getDate();
    this.minDate = new Date(currentYear + 0, currentMonth, currentDate);
    this.maxDate = new Date(currentYear + 20, 11, 31);

  }

  onSubmit(value) {
    this.createTodoForm.reset();
    this._todoListService.createTodo(value).subscribe(
      res => {
        this._snackbar.open('Todo created!', 'Dismiss', {
          duration: 3000
        })
        this._router.navigate(['/todo'])
      }
      ,
      err => {
        this._snackbar.open('An error occurred! ' + err.message, 'Dismiss', {
          duration: 6000
        })
      }
    )
  }

  ngOnInit() {
  }

}
