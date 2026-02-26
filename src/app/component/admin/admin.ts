import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../service/api-service';
import { FormsModule } from '@angular/forms';
import { NaPipe } from '../../pipe/na-pipe';
import { isActive } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, FormsModule, NaPipe],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Admin implements OnInit {
  users: any[] = [];

  userObj: any = {
    id: '',
    username: '',
    password: '',
    userType: '',
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    isActive: ''
  };

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(){
    this.apiService.get<any[]>('user/all').subscribe({
      next: (data) => {
        //this.users = [...data]; // Create new array reference for change detection
        this.users = data.filter(user => user.userType === 'ADMIN'); // Filter users with userType 'ADMIN'
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Error fetching users', err),
    });
  }

  createUser(form: any) {
    this.apiService.post<any>('user/create', this.userObj).subscribe({
      next: () => {
        this.loadUsers(); // Reload users to reflect the new entry
        alert('User saved successfully');
        this.resetFormData();
        form.resetForm();
      },
      error: (err) => console.error('Error saving user', err),
    });
  }

  editUser(user: any) {
    this.userObj = {
      id: user.id,
      username: user.username,
      password: user.password,
      userType: user.userType,
      name: user.name,
      age: user.age,
      gender: user.gender,
      phone: user.phone,
      email: user.email,
      address: user.address,
      isActive: user.isActive
    };
  }

  updateUser(form: any) {
    const user = this.userObj;
    debugger;
    this.apiService.put<any>('user/update/' + user.id, this.userObj).subscribe({
      next: () => {
        this.loadUsers(); // Reload users to reflect the updated entry
        alert('User updated successfully');
        this.resetFormData();
        form.resetForm();
      },
      error: (err) => console.error('Error updating user', err),
    });
  }

  deleteUser(id: number) {
    debugger;
    const isDeleted = confirm('Are you sure you want to delete this user?');
    if (isDeleted) {
      this.apiService.delete<any>('user/delete/' + id).subscribe({
        next: () => {
          this.loadUsers(); // Reload users to reflect the deletion
          alert('User deleted successfully');
        },
        error: (err) => console.error('Error deleting user', err)
      });
    }
  }

  resetFormData() {
    this.userObj = {
      id: '',
      username: '',
      password: '',
      userType: '',
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      isActive: ''
    };
  }

  resetForm(userForm: any) {
    this.userObj = {
      id: '',
      username: '',
      password: '',
      userType: '',
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      address: '',
      isActive: ''
    };
    userForm.resetForm();
  }
}
