import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [NgStyle],
  templateUrl: './progress-bar.html',
  styleUrl: './progress-bar.css',
})
export class ProgressBar {

  @Input() progress: number = 0;

}
