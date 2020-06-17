import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthUser } from '../../user/models/authUser';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AuthService } from 'angular-6-social-login';
@Injectable({
  providedIn: 'root'
})
export class LoginAuthService {

  basePath = `${environment.userApi}`;
  token = localStorage.getItem('ACCESS_TOKEN');
  
   httpOptions = {
    header: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor(private httpClient: HttpClient,
    public OAuth: AuthService) { }
  
  
  public loginAuth(userInfo: Object): any{
    return this.httpClient.post<any>(`${this.basePath}login`,userInfo)
    .pipe(catchError(this.errorHandler))
  }

  public isLoggedIn(): boolean{
    return !!localStorage.getItem('ACCESS_TOKEN');
  }

  public getUserInformation(){
    return localStorage.getItem('userAuth');
  }

  public logout(){
    
    return this.httpClient.post<any>(`${this.basePath}logout`, this.httpOptions)
  }

  public getUserByEmail(email: string): Observable<any>{
    return this.httpClient.get<AuthUser>(`${this.basePath}getUserAuthByEmail/${email}`)
                          .pipe(catchError(this.errorHandler))
  }

  public googleLogin(email: string): Observable<any>{
    return this.httpClient.get<AuthUser>(`${this.basePath}googleLogin/${email}`)
                          .pipe(catchError(this.errorHandler))
  }

  errorHandler(error: HttpErrorResponse){
    return throwError(error.message || "Error")
  }
}