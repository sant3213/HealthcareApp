import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './security/login-component/login.component';
import { AuthGuard } from './auth.guard';
import { RegisterFormComponent } from './user/register-component/register-form.component';
import { MyPublicationComponentComponent } from './publication/my-publication-component/my-publication-component.component';
import { RegisterPublicationComponent } from './publication/register-publication/register-publication.component';
import { PopupTypeComponent } from './shared/popup-type/popup-type.component';
import { PublicationComponent } from './publication/publication-component/publication.component';
import {HeaderResolver} from './shared/header-resolver/header-resolver.service';

const routes: Routes = [
  {    
    path: '',    
    pathMatch:'full',
    redirectTo: 'publications',
    data: {    
      claimType: 'canAccessPublications'
    }, 
  },    
  {    
    path: 'login',    
    component: LoginComponent
  }, 
  {    
    path: 'register',    
    component: RegisterFormComponent,
    resolve: {
      socialUser: HeaderResolver
    }
  }, 
  {    
    path: 'registerPublications',    
    component: RegisterPublicationComponent
  },
  {    
    path: 'myPublication',    
    component: MyPublicationComponentComponent
  },
  {    
    path: 'popUpRegister',    
    component: PopupTypeComponent
  },
  {    
    path: 'publications',    
    component: PublicationComponent,
    data: {    
      claimType: 'canAccessPublications'
    },
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
