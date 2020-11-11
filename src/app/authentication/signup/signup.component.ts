import { Component, OnInit, Inject } from '@angular/core';
import { MatSnackBar, MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/Services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm

  constructor(private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _router: Router,
    private _authenticationService: AuthenticationService,
    public signUpSheetRef: MatBottomSheet,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.signUpForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['',
        Validators.required
      ]
    })
  }

  ngOnInit() {
  }

  onSignUp(signUpData) {
    this._authenticationService.checkUserDuplicate(signUpData.username).subscribe(
      res => {
        console.log(res);
        if (res) {

          console.log("Unique")
          this._authenticationService.signUpUser(signUpData).subscribe(
            res => {
              this._snackBar.open('Sign Up successful!', 'Dismiss', {
                duration: 3000
              })
              this.signUpSheetRef.dismiss()
            },
            err => {
              this._snackBar.open('An error occurred: ' + err.message)
            }
          )
        }
        else {
          this.signUpForm.reset()
          let snackBarRef = this._snackBar.open('Account already exists! Please login to continue!','Login',{
            duration: 7000
          })
          snackBarRef.onAction().subscribe(
            result=>this.signUpSheetRef.dismiss()
          )
          
        }
      },
      err => this._snackBar.open('An Error Occurred: ' + err.message)
    )
  }

}
