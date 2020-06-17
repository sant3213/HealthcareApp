import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from './register-component/register-form.component';
import { LoginComponent } from '../security/login-component/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthServiceConfig, GoogleLoginProvider } from 'angular-6-social-login';
import { AngulaMaterialModule } from '../angula-material/angula-material.module';
import {JwtModule} from '@auth0/angular-jwt'

export function socialConfigs() {  
  const config = new AuthServiceConfig(  
    [  
      {  
        id: GoogleLoginProvider.PROVIDER_ID,  
        provider: new GoogleLoginProvider('419168859251-8vmvquvuqpbejj9ai73t0jhqrrl0agef.apps.googleusercontent.com')  
      }  
    ]  
  );  
  return config;  
}

@NgModule({
  declarations: [
    LoginComponent,
    RegisterFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    AngulaMaterialModule,
    JwtModule
    
  ],
  exports:[
    RegisterFormComponent,
    LoginComponent
  ]
})
export class UserModule { }
