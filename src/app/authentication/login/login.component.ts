import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/Services/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatBottomSheet } from '@angular/material';
import { SignupComponent } from '../signup/signup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authentication: AuthenticationService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private _bottomSheet: MatBottomSheet) {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  }


  onLogIn(loginData) {

      this.authentication.loginUser(loginData).subscribe(
      res => {
        sessionStorage.setItem('token', res['token'])
        this.router.navigate(['/todo'])
        this._snackBar.open('Welcome back!', 'Dismiss', {
          duration: 3000
        })
      },
      err => {
        console.log(err)
        if (err.status === 404) {
          this._snackBar.open("username not registered!", 'Dismiss', {
            duration: 3000
          })
          this.openSignUpPrompt()
        }
        else if (err.status === 401) {
          this._snackBar.open('Incorrect password, please try again!', 'Dismiss', {
            duration: 3000
          })
        }
        else if (err.status === 500) {
          this._snackBar.open('An error occurred! Error: ' + err.message + '. Please take a screenshot and send it to the Developer!', 'Dismiss')
        }
        else {
          this._snackBar.open("An Error Occurred: "+err.message)
        }

      }

    );

    
  }

  ngOnInit() {
    this.openSignUpPrompt();
  }

  openSignUpPrompt(){
    setTimeout(()=>{
      let snackBarRef = this._snackBar.open('New to Todo? Sign Up Instead!','Sign Up')
      snackBarRef.onAction().subscribe(
        result=>this.openSignUpSheet()
      )
    },2000)
  }

  openSignUpSheet(){
    setTimeout(()=>{
      this._bottomSheet.open(SignupComponent,{
      })
    },200)
  }


}
