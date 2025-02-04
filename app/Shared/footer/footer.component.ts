import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  providers: [DatePipe],
})
export class FooterComponent {
  date = new Date();

  constructor() {
    console.log('FooterComponent created');
  }
}
