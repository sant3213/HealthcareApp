import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { PopupTypeComponent } from '../../shared/popup-type/popup-type.component';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import { Observable } from 'rxjs';
import { AuthUser } from '../models/authUser';
import swal from'sweetalert2';

export interface DialogData {
  buildingIdFromApartment: string;
}

function passwordMatcher(c: AbstractControl): {[key: string]: boolean} | null {
  const passwordControl = c.get('password');
  const confirmControl = c.get('confirmPassword');

  // To prevent an error appear when the user hasn´t touch the fields
  if(passwordControl.pristine || confirmControl.pristine){
    return null;
  }

  if(passwordControl.value == confirmControl.value) {
    return null;
  }
  return {'match':true};
}

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  userForm: FormGroup;
  userInformation: User;
  userAuth: AuthUser
  state$: Observable<object>;
  data: string
  isDoctor = false
  type: string
  socialUser: any;
  socialUserNInformation = [];
  emailValue: any;
  nameValue: any;
  alert:string;
  passwordMessage: string;

  private validationMessages = {
    required: 'Por favor ingrese una contraseña.',
    password: 'Por favor ingrese una contraseña válida.',
    range: 'La contraseña debe ser mayor a 6 caracteres'
  };

  onCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    this.dialog.open(PopupTypeComponent);
  }

  constructor(private route: ActivatedRoute,
    public dialog: MatDialog, private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router) { }

  ngOnInit() {

    this.socialUser = this.route.snapshot.data['socialUser'];
    if (!this.socialUser) {
      this.emailValue = ''
      this.nameValue = ''
    } else {
      this.emailValue = this.socialUser.email
      this.nameValue = this.socialUser.name
    }
    
    this.userForm = this.fb.group({
      userName: [this.nameValue, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      }, {validator: passwordMatcher}),
      city: ['', Validators.required],
      type: [this.type]
    });

    localStorage.removeItem('socialUser');
    this.openDialog();

    const passwordControl = this.userForm.get('passwordGroup.password');
    passwordControl.valueChanges.subscribe(
      value => this.setMessage(passwordControl)
    )
  }

  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    const dialogRef = this.dialog.open(PopupTypeComponent, {
      width: '750px',
      height: '350px',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == '2') {
        this.isDoctor = true
      } else {
        this.isDoctor = false
      }
      this.setValidators();
    }
    );
  }

  setValidators():void {
    if (this.isDoctor) {
      this.userForm = this.fb.group({
        userName: [this.nameValue, Validators.required],
      email: ['', [Validators.required, Validators.email]],
        passwordGroup: this.fb.group({
          password: ['', Validators.required],
          confirmPassword: ['', Validators.required],
        }, {validator: passwordMatcher}),
        city: ['', Validators.required],
        specialization: ['', Validators.required],
        pin: ['', Validators.required],
        eps: ['', Validators.required],
        university: ['', Validators.required],
        experience: ['', Validators.required],
        type: [this.isDoctor]
      });
    }

  }

  register(userForm) {

    this.userAuth = this.setUserValues(userForm);
    this.registerService.registerUser(this.userAuth).subscribe(
      rsp => {
         if(rsp.message == 'success'){
           localStorage.setItem('ACCESS_TOKEN', rsp.token)
           localStorage.setItem('userAuth', JSON.stringify(rsp.user))
           swal.fire('Registro exitoso...', this.alert, 'success');
          this.router.navigate(['/publications']);
         }else{
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo falló!'
          })
         }
      },
      error=>{
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo falló!'
        })
      }
    )
  }

  setUserValues(userForm: FormGroup): any {
    if (!this.isDoctor) {
      const userAuth: AuthUser = {
        email: userForm.get('email').value,
        userName: userForm.get('userName').value,
       password: userForm.get('passwordGroup.password').value,
        city: userForm.get('city').value,
        canAccessPublications: true,
        canAccessAccount: true,
        canAccessComments: false,
        canAccessMyPublications: true,
        state: true
      }
      return userAuth;

    } else {

      const userAuth: AuthUser = {
        email: userForm.get('email').value,
        userName: userForm.get('userName').value,
        password: userForm.get('passwordGroup.password').value,
        canAccessPublications: true,
        canAccessAccount: true,
        canAccessComments: true,
        canAccessMyPublications: false,
        city: userForm.get('city').value,
        eps: userForm.get('eps').value,
        pin: userForm.get('pin').value,
        specialization: userForm.get('specialization').value,
        qualification: '5',
        university: userForm.get('university').value,
        experience: userForm.get('experience').value,
        state: true
      }
      return userAuth;
    }
  }
  setMessage(c: AbstractControl): void {
    this.passwordMessage = '';
    if ((c.touched || c.dirty ) && c.errors) {
      this.passwordMessage = Object.keys(c.errors).map(
        key => this.validationMessages[key]).join(' ');
    }
  }
}
