import { Component } from '@angular/core';
import { LoginAuthService } from './security/auth-service/login-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'healthProject';

  constructor(public authService: LoginAuthService){ }

}
