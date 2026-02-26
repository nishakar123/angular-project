import { Component } from '@angular/core';
import { ProgressBar } from '../re-usable/progress-bar/progress-bar';
import { ButtonTabs } from '../re-usable/button-tabs/button-tabs';

@Component({
  selector: 'app-home',
  imports: [ProgressBar, ButtonTabs],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  currentButtonTab: string = '';

  students: any[] = [
    { id: 1, name: 'Alice', age: 20, attendance: '95' },
    { id: 2, name: 'Bob', age: 22, attendance: '85' },
    { id: 3, name: 'Charlie', age: 23, attendance: '90' },
    { id: 4, name: 'Diana', age: 21, attendance: '88' },
    { id: 5, name: 'Ethan', age: 24, attendance: '92' }
  ];

  employees: any[] = [
    { id: 1, name: 'John Doe', position: 'Developer', attendance: '40' },
    { id: 2, name: 'Jane Smith', position: 'Designer', attendance: '75' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', attendance: '35' },
    { id: 4, name: 'Emily Davis', position: 'Tester', attendance: '80' },
    { id: 5, name: 'William Brown', position: 'Support', attendance: '75' }
  ];

  onButtonChange(selectedTab: string) {
    console.log('Selected Tab:', selectedTab);
    this.currentButtonTab = selectedTab;
  }

}
