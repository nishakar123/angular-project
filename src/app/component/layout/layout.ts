import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

  router = inject(Router);

  onLogout(){
    this.router.navigateByUrl('login');
    localStorage.removeItem('loggedInUser');
    alert('Logged Out Successfully');
  }

}
