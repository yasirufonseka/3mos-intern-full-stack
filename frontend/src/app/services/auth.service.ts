import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import { loginCredentials } from './user.service';
import {  Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private apiUrl = 'http://localhost:8080/api/users';


  constructor(private http: HttpClient, private cookieService: CookieService,private router:Router) {
    this.http = http;
    this.cookieService = cookieService;
    this.router = router;
    this.authenticateUser();
   }

   

authenticateUser() {
  if (this.cookieService.check('userId') && this.cookieService.check('role')) {
    console.log('User is authenticated via cookies.');
    console.log(this.cookieService.get('userId'));
    console.log(this.cookieService.get('role'));
    this.router.navigate(['/intern-list']);
  } else {
    console.log('No valid authentication cookies found.');
    this.router.navigate(['/login']);
  }
}

  
  loginUser(credentials: loginCredentials) {
    this.http.post(`${this.apiUrl}/login`, credentials).subscribe({
      next: (data: any) => {
        if (data?.userId === null && data?.role === null) {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Invalid username or password.',
          });
         


        }else{
        console.log('Login successful');
        Swal.fire('Success', 'Login successful', 'success');
        // Store user data in cookies
        this.cookieService.set('userId', data.userId, 0.5 );
        this.cookieService.set('role', data.role, 0.5 );
        // You can also redirect the user to another page here if needed
        this.router.navigate(['/intern-list']);
      
      
       }
       },
      error: (error) => {
        console.error('Login failed', error);
        Swal.fire('Error', 'Login failed', 'error');
      }
    });
  }
}
