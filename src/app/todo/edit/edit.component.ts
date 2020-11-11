import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TodoListService } from 'src/app/core/Services/todo-list.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  todo;
  editTodoForm;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private _todoListService: TodoListService,
              private _snackBar: MatSnackBar,
              private _formBuilder: FormBuilder,
              private _router: Router) {
                this.editTodoForm = this._formBuilder.group(
                  {
                    name: ['',Validators.required],
                    description: ['',Validators.required],
                    dueDate: ['',Validators.required],
                   deleted: false,
                   current: true 
                  }
                )
                this._todoListService.getTodo(this.data).subscribe(
                  res=>{
                    this.todo = res;
                    this.editTodoForm.patchValue({
                      name: this.todo.name
                    });
                    this.editTodoForm.patchValue({
                      description: this.todo.description
                    });
                    this.editTodoForm.patchValue({
                      dueDate: this.todo.dueDate
                    });
                  },
                  err=>this._snackBar.open('An Error Occurred: '+err.message, 'Dismiss')
                )
               }

  ngOnInit() {
  }

  onSubmit(todo){
    this._todoListService.editTodo(this.data,todo).subscribe(
      res=>{this._snackBar.open('Todo Modified','Dismiss',{
        duration: 4000
      })
      this._router.navigate(['/todo'])
    },
      err=>this._snackBar.open('An Error Occurred: '+err.message, 'Dismiss')
    )
  }



}
