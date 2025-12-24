import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { loginCredentials, UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  login:FormGroup;



  constructor(private authService: AuthService,private fb:FormBuilder) { 
    this.authService = authService;
    this.login = this.fb.group({
      username: ['',[Validators.required]],
      password: ['',Validators.required]

    });

  }


  loginUser() {
    const form: loginCredentials = this.login.value;

    if (this.login.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Username or Password',
        text: 'Please fill in both username and password.',
      });
      return;
      
    }
    this.authService.loginUser(form);
  }
}
