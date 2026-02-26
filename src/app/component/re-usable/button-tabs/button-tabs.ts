import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-tabs',
  imports: [NgClass],
  templateUrl: './button-tabs.html',
  styleUrl: './button-tabs.css',
})
export class ButtonTabs {

  @Input() buttonTabs: string[] = [];

  @Output() onButtonClickeOutput = new EventEmitter<string>();

  activeTab: string = 'Employees';

  onButtonClick(buttonTab: string) {
    debugger
    this.activeTab = buttonTab;
    this.onButtonClickeOutput.emit(buttonTab);
  }

}
