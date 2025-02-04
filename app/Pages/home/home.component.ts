import { Component } from '@angular/core';
import { QlikAppComponent } from '../../Components/qlik-app/qlik-app.component';
import { NgFor, NgIf } from '@angular/common';
import { QlikSpacesComponent } from '../../Components/qlik-spaces/qlik-spaces.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [QlikSpacesComponent, QlikAppComponent, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
