import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GoogleLoginProvider, FacebookLoginProvider, AuthService } from 'angular-6-social-login'; 
import { AuthServiceConfig } from 'angular-6-social-login'; 
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserModule } from './user/user.module';
import { SharedModule } from './shared/shared.module';
import { PublicationModule } from './publication/publication.module';
import { AngulaMaterialModule } from './angula-material/angula-material.module';
import { HttpInterceptorModule } from './security/interceptor/http-interceptor.service';
import 'hammerjs';
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
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    UserModule,
    SharedModule,
    PublicationModule,
    HttpInterceptorModule
  ],
  exports:[AngulaMaterialModule],
  providers: [AuthService,  
    {  
      provide: AuthServiceConfig,  
      useFactory: socialConfigs  
    }  
  ], 
  bootstrap: [AppComponent]
})
export class AppModule { }
