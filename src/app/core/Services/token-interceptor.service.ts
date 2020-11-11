import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpInterceptor } from '@angular/common/http';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private _authenticationService: AuthenticationService) { }
  intercept(req,next) {
    let authorizationHeaderValue = 'Bearer '
    authorizationHeaderValue += this._authenticationService.getToken()

    let tokenizedRequest = req.clone({
      setHeaders: {
        Authorization: authorizationHeaderValue
      }
    })
    return next.handle(tokenizedRequest)
  }
}
