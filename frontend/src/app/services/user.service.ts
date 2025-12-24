import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CookieService } from 'ngx-cookie-service';

export interface loginCredentials {
  username: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';


  constructor(private http: HttpClient, private cookieService: CookieService) { }

  getUsers(id?: string) {
   return this.http.get(`${this.apiUrl}/getallusers`);
  }

  addUser(userData: any) {
    this.http.post(`${this.apiUrl}/adduser`, userData).subscribe({
      next: (data) => {
        console.log('User added successfully');
        Swal.fire('Success', 'User added successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to add user', error);
        Swal.fire('Error', 'Failed to add user', 'error');
      }
    });
  }

  updateUser(id: string, userData: any) {
   return this.http.put(`${this.apiUrl}/updateuser?id=${id}`, userData);
  }


  deleteUser(id: string) {
    this.http.delete(`${this.apiUrl}/deleteuser?id=${id}`).subscribe({
      next: (data) => {
        console.log('User deleted successfully'); 
        Swal.fire('Success', 'User deleted successfully', 'success');
      },
      error: (error) => {
        console.error('Failed to delete user', error);
        Swal.fire('Error', 'Failed to delete user', 'error');
      }
    });
  }

  getUserById(id: string) {
    return this.http.get(`${this.apiUrl}/byid?id=${id}`);
  }

}