import { Component, OnInit } from '@angular/core';
import { GoogleLoginProvider, AuthService, SocialUser } from 'angular-6-social-login';
import { Socialusers } from '../../user/models/social-users';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoginAuthService } from '../auth-service/login-auth.service';
import { User } from '../../user/models/user';
import { AuthUser } from '../../user/models/authUser';
import swal from'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;
  isSubmitted = false;
  user: User;
  userTypeToRegister = ''
  userAuth: AuthUser;
  returnUrl: string;
  errorMsg: string;
  socialUsers: any;
  emailMessage = '';
  alert:string;
  private validationMessages = {
    required: 'Por favor ingrese su correo electrónico.',
    email: 'Por favor ingrese una dirección válida.'
  };

  constructor(
    public OAuth: AuthService,
    public authService: LoginAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
    
    const emailControl = this.loginForm.get('email');
    emailControl.valueChanges.subscribe(
      value => { this.setMessage(emailControl)}
    )
  }

  setMessage(c: AbstractControl): void {
    this.emailMessage = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.emailMessage = Object.keys(c.errors).map(
        key =>  this.validationMessages[key]).join(' ');
      }
    }

  public socialSignIn(socialProvider: string) {
    let socialPlatformProvider;
    if (socialProvider === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.OAuth.signIn(socialPlatformProvider).then(
      socialUser => {
        this.checkUser(socialUser);
      },
      error=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Contraseña ó usuario inválido'
        })
      }
    );
  }
  checkUser(socialusers: Socialusers) {
    this.authService.googleLogin(socialusers.email).subscribe(
      response => {
        this.user = response;
        if (response.message == 'success') {
          localStorage.setItem('ACCESS_TOKEN', response.token)
          swal.fire('Sesión iniciada', this.alert, 'success');
          localStorage.setItem('userAuth', JSON.stringify(response.user));
          this.router.navigate(['/publications'])
        }
      },
      error => {
        if (error.includes("404")) {
          localStorage.setItem('socialUser', JSON.stringify(socialusers));
          this.router.navigate(['/register']);
        }
      }
    )
  }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    } else {
      this.authService.loginAuth(this.loginForm.value).subscribe(
        resp => {
          if (resp.message == "success") {
            this.userAuth = resp.user;
            localStorage.setItem('ACCESS_TOKEN', resp.token)
            localStorage.setItem('userAuth', JSON.stringify(this.userAuth));
            swal.fire('Logueo exitoso', this.alert, 'success');
            this.router.navigateByUrl('/publications');
            if (this.returnUrl) {
              this.router.navigateByUrl(this.returnUrl);
            }
          } else {
            console.log("Error")
          }
        },
        error=>{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Contraseña ó usuario inválido'
          })
    })
  }
  }

  createNewUser() {
    localStorage.removeItem('socialuser');
    this.router.navigate(['/register']);
  }
}