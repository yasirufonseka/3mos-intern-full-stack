import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';

export interface UserProfile {
  name: string;
  email: string;
  username: string;
  role: string;
  password: string;

 
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user!:UserProfile ;
  isEditMode = false;
  id!: string;

  avatar:String ='<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z"/></svg>';

  constructor(private router: Router, private userService: UserService, private cookieService: CookieService) {
  this.cookieService = cookieService;
  this.userService = userService;
   }

  ngOnInit(): void {
    this.id = this.cookieService.get('userId');
    this.getuser();
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    // Add logic to save profile
    this.userService.updateUser(this.id,this.user).subscribe({
          next: (data) => {
            console.log('User updated successfully'); 
            Swal.fire('Success', 'User updated successfully', 'success');
          },
          error: (error) => {
            console.error('Failed to update user', error);
            Swal.fire('Error', 'Failed to update user', 'error');
          }
        });
  
    this.isEditMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  goBackToInternList() {
    this.router.navigate(['/interns']);
  }

  getuser(){
    // Fetch user data from a service or API
    this.userService.getUserById(this.id)?.subscribe({
      next:(data:any)=>{
        this.user=data;
        console.log(this.user);
      },
      error:(error)=>{
        console.error('Failed to retrieve user data', error);
      }
    })

  }

  logout() {
    // Add logout logic
    console.log('Logging out...');
    this.cookieService.delete('userId');
    this.cookieService.delete('role');
    this.router.navigate(['/login']);
  }
}
