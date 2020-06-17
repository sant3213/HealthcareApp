import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginAuthService } from './security/auth-service/login-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: LoginAuthService,
    private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let claimType: string = next.data['claimType']
    const user = JSON.parse(localStorage.getItem('userAuth'));
    const token = localStorage.getItem('ACCESS_TOKEN');
    
    if(this.authService.isLoggedIn() &&  user[claimType] && !!token){
    return true
    } 
    else {
      this.router.navigate(['/login'],
      {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
