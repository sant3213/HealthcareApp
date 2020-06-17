import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from'sweetalert2';
import { Observable } from 'rxjs';
import { RegistryService } from '../services/registry.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Register } from '../models/register';

@Component({
  selector: 'app-register-publication',
  templateUrl: './register-publication.component.html',
  styleUrls: ['./register-publication.component.css']
})
export class RegisterPublicationComponent implements OnInit {
  userForm: FormGroup;
  registry: Register
  state$: Observable<object>;
  alert:string;
  userDataJson: any

  constructor(private fb: FormBuilder,
    private registryService: RegistryService,
    private router: Router) { }

  ngOnInit() {
    const userData = localStorage.getItem('userAuth');
    this.userDataJson = JSON.parse(userData);
    this.userForm = this.fb.group({
      title: ["", Validators.required],
      text: ['', Validators.required],
      specialization: ['', Validators.required],
      patiente: [this.userDataJson.email, Validators.required]
    });
  }

  register(userForm) {
    this.registry= this.setRegistryValues(userForm);
    this.registryService.registerUser(this.registry).subscribe(
      rsp => {
         if(rsp.message == 'success'){
          swal.fire('Registro exitoso...', this.alert, 'success');
          this.resetValues()
          this.router.navigate(['/registerPublications']);
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
  setRegistryValues(userForm: FormGroup): any {
      const registry: Register = {
        title: userForm.get('title').value,
        text: userForm.get('text').value,
        specialization: userForm.get('specialization').value,
        patiente: this.userDataJson.email
      }
      return registry; 
  }

  resetValues(){
    this.userForm.reset()
  }

}
