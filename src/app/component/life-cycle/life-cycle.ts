import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ProgressBar } from '../re-usable/progress-bar/progress-bar';
import { ButtonTabs } from '../re-usable/button-tabs/button-tabs';

@Component({
  selector: 'app-life-cycle',
  imports: [ProgressBar, ButtonTabs],
  templateUrl: './life-cycle.html',
  styleUrl: './life-cycle.css',
})
export class LifeCycle implements OnInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, OnDestroy {

  buttonTab : string[] = ['Employees', 'Students'];

  currentButtonTab: string = '';

  employees: any[] = [
    { id: 1, name: 'John Doe', position: 'Developer', attendance: '40' },
    { id: 2, name: 'Jane Smith', position: 'Designer', attendance: '75' },
    { id: 3, name: 'Mike Johnson', position: 'Manager', attendance: '35' },
    { id: 4, name: 'Emily Davis', position: 'Tester', attendance: '80' },
    { id: 5, name: 'William Brown', position: 'Support', attendance: '75' }
  ];

  students: any[] = [
    { id: 1, name: 'Alice', age: 20, attendance: '95' },
    { id: 2, name: 'Bob', age: 22, attendance: '85' },
    { id: 3, name: 'Charlie', age: 23, attendance: '90' },
    { id: 4, name: 'Diana', age: 21, attendance: '88' },
    { id: 5, name: 'Ethan', age: 24, attendance: '92' }
  ];

  onButtonChange(selectedTab: string) {
    console.log('Selected Tab:', selectedTab);
    this.currentButtonTab = selectedTab;
  }

  constructor() {
    console.log('Constructor: LifeCycle component is being constructed.');
  }

  ngOnInit(): void {
    console.log('ngOnInit: LifeCycle component has been initialized.');
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit: LifeCycle component view has been initialized.');
  }

  ngAfterViewChecked(): void {
    console.log('ngAfterViewChecked: LifeCycle component view has been checked.');
  }

  ngAfterContentInit(): void {
    console.log('ngAfterContentInit: LifeCycle component content has been initialized.');
  }

  ngAfterContentChecked(): void {
    console.log('ngAfterContentChecked: LifeCycle component content has been checked.');
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy: LifeCycle component is about to be destroyed.');
  }

}
