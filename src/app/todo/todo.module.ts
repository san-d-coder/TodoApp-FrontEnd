import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodoRoutingModule } from './todo-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ShowComponent } from './show/show.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { CurrentTodoListComponent } from './current-todo-list/current-todo-list.component';
import { DeletedTodoListComponent } from './deleted-todo-list/deleted-todo-list.component';
import { CompletedTodoListComponent } from './completed-todo-list/completed-todo-list.component';


@NgModule({
  declarations: [CreateComponent, EditComponent, DeleteComponent, ShowComponent, CurrentTodoListComponent, DeletedTodoListComponent, CompletedTodoListComponent],
  imports: [
    CommonModule,
    TodoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule
  ]
})
export class TodoModule { }
