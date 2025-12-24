import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    department: 'Human Resources',
    joinDate: '2023-01-15',
    avatar: 'https://via.placeholder.com/150'
  };

  isEditMode = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  saveProfile() {
    // Add logic to save profile
    this.isEditMode = false;
  }

  cancelEdit() {
    this.isEditMode = false;
  }

  goBackToInternList() {
    this.router.navigate(['/interns']);
  }

  logout() {
    // Add logout logic
    console.log('Logging out...');
  }
}
