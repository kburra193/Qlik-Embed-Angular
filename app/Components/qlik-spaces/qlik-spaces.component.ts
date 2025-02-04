import { Component } from '@angular/core';
import { QlikSpace } from '../../Types/QlikSpace';
import { QlikApiService } from '../../../services/qlik-api.service';
import { BannerComponent } from "../banner/banner.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-qlik-spaces',
  standalone: true,
  imports: [BannerComponent, NgFor, NgIf],
  templateUrl: './qlik-spaces.component.html',
  styleUrl: './qlik-spaces.component.scss'
})
export class QlikSpacesComponent {
  qlikSpaces: QlikSpace[] = [];
  loading: boolean = true; // Initially set to true
  constructor(private qlikAppService: QlikApiService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  this.qlikAppService.getSpaces().then((spaces) => {
    this.qlikSpaces=[];
    console.log(spaces);

    this.qlikSpaces = spaces;
    this.loading = false; // Set to false after data is loaded

  });


  }
}
