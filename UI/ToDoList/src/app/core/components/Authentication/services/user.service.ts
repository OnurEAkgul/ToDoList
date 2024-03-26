import { Injectable } from '@angular/core';
import { userLogin } from '../models/login.model';
import { userSignup } from '../models/signup.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { userRequest } from '../models/user.model';
import { UserUpdate } from '../models/user-update.model';
import { signupRequest } from '../models/user-signup-request.model';
import { loginResponse } from '../models/loginRespone.model';

import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private cookieService: CookieService) {}
  ApiBaseUrl = environment.apiBaseUrl + '/api';
  userEkle(model: signupRequest): Observable<userRequest> {
    return this.http.post<userRequest>(
      `${this.ApiBaseUrl}/Users/signUp`,
      model
    );
  }
  userLogin(model: userLogin): Observable<loginResponse> {
    return this.http.post<loginResponse>(`${this.ApiBaseUrl}/Users/login`, {
      UserName: model.UserName,
      Password: model.Password,
      Email: model.Email,
      RememberMe: model.RememberMe,
    });
  }
  tokenDecode() {
    let Token = this.cookieService.get('Authorization');
    Token = Token.replace('Bearer', '');
    const decodedToken: any = jwtDecode(Token);
    // console.log(decodedToken);
    return decodedToken;
  }
  logout(): void {
    localStorage.clear();

    this.cookieService.delete('Authorization');
  }

  //   PUT
  // /api/Users/Update/{UserId}

  UpdateUser(userId: string, updateModel: UserUpdate): Observable<any> {
    return this.http.put<any>(
      `${this.ApiBaseUrl}/Users/Update/${userId}`,
      updateModel
    );
  }

  // DELETE
  // /api/Users/DeleteUser/{UserId}
  DeleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.ApiBaseUrl}/Users/DeleteUser/${userId}`
    );
  }
  // GET
  // /api/Users/getAllUsers

  GetAllUsers(): Observable<userRequest[]> {
    return this.http.get<userRequest[]>(`${this.ApiBaseUrl}/Users/getAllUsers`);
  }
  // GET
  // /api/Users/GetUserById/{UserId}
  GetUser(UserId: string): Observable<userRequest> {
    return this.http.get<userRequest>(
      `${this.ApiBaseUrl}/Users/GetUserById/${UserId}`
    );
  }
}
