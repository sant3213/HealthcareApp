import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SocialUser } from 'angular-6-social-login';
import { Socialusers } from '../../user/models/social-users';

@Injectable({
  providedIn: 'root'
})
export class HeaderResolver implements Resolve<SocialUser> {

  constructor(private httpClient: HttpClient) { }
  socialUser: SocialUser
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Socialusers{
      this.socialUser = JSON.parse(localStorage.getItem('socialUser'));
      return this.socialUser;
  }
}
