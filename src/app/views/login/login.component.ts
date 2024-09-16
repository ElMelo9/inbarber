import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { FloatLabelModule } from 'primeng/floatlabel';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginI, LoginResponse } from '../../models/login.interface';
import { LoginService } from '../../services/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import {saveToLocalStorage }from '../../helpers/storage-helper';
import { decodeTokenPayload } from '../../helpers/jwt-helper';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CalendarModule,
     FloatLabelModule,
     ReactiveFormsModule,
     PasswordModule,
     InputTextModule
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;


  constructor(

    private fb: FormBuilder,
     private loginService: LoginService,
     private router: Router

  ){
    this.loginForm = this.fb.group({
      email_usuario: ['', [Validators.required, Validators.email]],
      password_usuario: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(form: LoginI) {
    this.loginService.login(form).subscribe({
      next: (response: LoginResponse) => {
        this.dataHelpper(response)
        this.router.navigate(['home'])
        Swal.fire({
          title: 'Login exitoso',
          text: 'Has iniciado sesión correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        }); 

      },
      error: (error) => {
        console.error('Error en el login', error);  // Manejar el error aquí
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema con el inicio de sesión.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
      complete: () => {

      }
    });
  }

  dataHelpper(response: LoginResponse){
    saveToLocalStorage("token", response.token_usuario)
    saveToLocalStorage("tipo",response.token_tipo)
    const tokenPayload =decodeTokenPayload(response.token_usuario)
    console.log(tokenPayload)
    saveToLocalStorage("exp", tokenPayload.exp)
    saveToLocalStorage("nombre_usuario", tokenPayload.Nombre_usuario)

  }


}
