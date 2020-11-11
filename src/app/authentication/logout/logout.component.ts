import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/Services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router,
              private _snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("logout called");
    
    this._authenticationService.logoutUser();
    this._router.navigate(['/']);
    this._snackBar.open('Logged Out Successfully','Dismiss',{
      duration: 1500
    })
  }

}
