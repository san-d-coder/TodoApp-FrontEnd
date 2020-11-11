import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  private _searchTermSource = new Subject<string>();
  searchTerm$ = this._searchTermSource.asObservable();

  todoURL = "http://localhost:4000/todolist";

  constructor(private _http: HttpClient) { }

  //searchFilter

  searchTerm(searchTerm: string){
    this._searchTermSource.next(searchTerm);
  }

  //get all
  getTodos(){
    return this._http.get(this.todoURL)
  }

  //get current

  getCurrentTodos(){
    return this._http.get(this.todoURL+'/current')
  }

  //get completed

  getCompletedTodos(){
    return this._http.get(this.todoURL+'/completed')
  }

  //get deleted

  getDeletedTodos(){
    return this._http.get(this.todoURL+'/deleted')
  }

  //get one

  getTodo(id){
    return this._http.get(this.todoURL+'/'+id)
  }

  //get count

  getCount(){
    return this._http.get(this.todoURL+'/count')
  }

  //edit one

  editTodo(id,todo){
    return this._http.patch(this.todoURL+'/'+id,todo)
  }

  //delete one

  deleteTodo(id){
    return this._http.delete(this.todoURL+'/'+id)
  }

  //create one

  createTodo(todo){
    return this._http.post(this.todoURL,todo)
  }

}
