import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  authURL: string = "http://localhost:4000/users";

  constructor(private _httpClient: HttpClient) { }

  //Login User
  loginUser(loginData){
    return this._httpClient.post(this.authURL+'/login',loginData)
  }

  //Check Logged In

  isLoggedIn(){
    return !!sessionStorage.getItem('token')
  }

  //Get Token

  getToken(){
    return sessionStorage.getItem('token')
  }

  //Check Duplicate

  checkUserDuplicate(username){
    return this._httpClient.get(this.authURL+'/check/'+username)
  }

  //Create User
  signUpUser(signUpData){
    return this._httpClient.post(this.authURL,signUpData)
  }

  //Logout User
  logoutUser(){
    sessionStorage.removeItem('token')
  }
}
