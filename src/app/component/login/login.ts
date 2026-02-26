import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

  loginObject = {
    email: '',
    password: ''
  };

  router = inject(Router);

  onLogin(){
    console.log(`Email: ${this.loginObject.email}\nPassword: ${this.loginObject.password}`);
    if(this.loginObject.email === 'admin@gmail.com' && this.loginObject.password === 'admin'){
      alert('Login Successful');
      localStorage.setItem('loggedInUser', this.loginObject.email);
      this.router.navigateByUrl('home');
    } else {
      alert('Invalid Credentials');
    }
  }

}
