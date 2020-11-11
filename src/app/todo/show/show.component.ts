import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateComponent } from '../create/create.component';
import { Router, NavigationEnd } from '@angular/router';
import { TodoListService } from 'src/app/core/Services/todo-list.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  mySubscription: any;
  private _searchTerm: string;

  searchString;

  get searchTerm() {
    return this._searchTerm
  }

  set searchTerm(value) {
    this._searchTerm = value
    this._todoService.searchTerm(this._searchTerm);
  }

  constructor(private _dialog: MatDialog,
    private _router: Router,
    private _todoService: TodoListService) {
    this._router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.mySubscription = this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Trick the Router into believing it's last link wasn't previously loaded
        this._router.navigated = false;
      }
    });
  }

  ngOnInit() {

  }

  createNew() {
    this._dialog.open(CreateComponent, {
      width: '600px'
    })

  }

}
