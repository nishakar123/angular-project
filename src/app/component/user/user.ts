import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../../service/api-service';
import { CommonModule } from '@angular/common';
import { NaPipe } from '../../pipe/na-pipe';

@Component({
  selector: 'app-user',
  imports: [CommonModule, ReactiveFormsModule, NaPipe],
  templateUrl: './user.html',
  styleUrl: './user.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class User implements OnInit {
  users: any[] = [];

  userForm: FormGroup = new FormGroup({
    id: new FormControl(''),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    userType: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
    age: new FormControl('', [Validators.required, Validators.min(1), Validators.max(100)]),
    gender: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^\+?[1-9]\d{1,10}$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    isActive: new FormControl(false),
  });

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.apiService.get<any[]>('user/all').subscribe({
      next: (data) => {
        this.users = data.filter(user => user.userType === 'USER'); // Filter users with userType 'USER'
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => console.error('Error fetching user data', err),
    });
  }

  saveUser() {
    this.apiService.post<any>('user/create', this.userForm.value).subscribe({
      next: (data) => {
        this.loadUserData(); // Reload user data to reflect the new entry
        alert('User data saved successfully');
        this.userForm.reset();
      },
      error: (err) => console.error('Error saving user data', err),
    });
  }

  editUser(user: any) {
    this.userForm.patchValue(this.mapValuesToForm(user));
  }

  updateUser() {
    const user = this.userForm.value;
    this.apiService.put<any>('user/update/' + user.id, user).subscribe({
      next: (data) => {
        console.log('User data updated successfully', data);
        this.loadUserData(); // Reload user data to reflect the updated entry
        alert('User data updated successfully');
        this.userForm.reset();
      },
      error: (err) => console.error('Error updating user data', err),
    });
  }

  mapValuesToForm(user: any) {
    return {
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

  deleteUser(id: number) {
    const isDeleted = confirm('Are you sure you want to delete this user?');
    if (isDeleted) {
      this.apiService.delete<any>(`user/delete/${id}`).subscribe({
        next: (data) => {
          this.loadUserData(); // Reload user data to reflect the deletion
          alert('User deleted successfully');
        },
        error: (err) => console.error('Error deleting user', err),
      });
    }
  }

  resetForm() {
    this.userForm.reset();
    this.userForm.markAsPristine();
    this.userForm.markAsUntouched();
  }
}
