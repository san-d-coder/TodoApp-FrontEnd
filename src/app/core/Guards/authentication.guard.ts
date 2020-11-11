import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthenticationService } from '../Services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private _authenticationService: AuthenticationService,
              private _router: Router){}

  canActivate(){
   if(this._authenticationService.isLoggedIn()){return true}
   else{
     this._router.navigate(['/'])
     return false
   }
  }
  canActivateChild(){
    return this.canActivate()
  }
  
}
