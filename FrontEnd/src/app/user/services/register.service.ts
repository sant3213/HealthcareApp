import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../models/authUser';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  basePath = `${environment.userApi}`;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'})
  };

  constructor(private httpClient: HttpClient) { }

  registerUser(user: AuthUser): Observable<any>{
    return this.httpClient.post<User[]>(`${this.basePath}registerUserAuth`, user, this.httpOptions);
  }

}
