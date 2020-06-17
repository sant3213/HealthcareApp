import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angular-6-social-login';
import { Router } from '@angular/router';
import { LoginAuthService } from 'src/app/security/auth-service/login-auth.service';
import swal from'sweetalert2';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  isLogged:boolean = false
  canAddPublication: boolean

  constructor(public OAuth: AuthService,
        private router: Router,
        private authService: LoginAuthService) {
         }
  
  ngOnInit() {
  const userData = localStorage.getItem('userAuth');
  const userDataJson = JSON.parse(userData);
  this.canAddPublication = userDataJson.canAccessComments;
  this.isLoggedIn()
  }

  logout() {  
    swal.fire({
    title: 'Estás seguro?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, cerrar sesión!'
  }).then((result) => {
    if (result.value) {
      swal.fire(
        'Sesión cerrada exitosamente!',
        'Has salido.',
        'success'
      )
      this.authService.logout().subscribe(
        resp => {
        localStorage.removeItem('ACCESS_TOKEN')
        localStorage.removeItem('userAuth')
        this.router.navigateByUrl('/login')
      },
      error => {
       alert('Error')
      })
    }
  })
   }  
   
   isLoggedIn(): boolean {
    this.isLogged = this.authService.isLoggedIn();
    return this.isLogged
  }

}
