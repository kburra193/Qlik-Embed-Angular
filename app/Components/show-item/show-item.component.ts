import { QlikApp } from './../../Types/QlikAPP';
import { QlikApiService } from './../../../services/qlik-api.service';
import { Component, Input } from '@angular/core';
import { imagesBaseUrl } from '../../constants/image-size';
import { Router } from 'express';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { QlikSpace } from '../../Types/QlikSpace';

@Component({
  selector: 'app-show-item',
  standalone: true,
  imports: [RouterModule, NgIf, NgFor],
  templateUrl: './show-item.component.html',
  styleUrl: './show-item.component.scss',
})
export class ShowItemComponent {
  @Input() showItem: any = null;
  /**
   *
   */
  constructor(private qlikApiService: QlikApiService) {}
  imagesBaseUrl = imagesBaseUrl;
  getDetailLink(): string {
    if (!this.showItem) {
      return '';
    }

    // Check the type of showItem and return appropriate link
    if (this.showItem.routeType == 'space') {
      return 'space-detail/' + this.showItem.id;
    } else if (this.showItem.routeType == 'app') {
      return this.showItem.link;
    }

    // Default or fallback link
    return this.showItem.link;
  }

  RecentClick() {
    const qlikApp = {
      id: this.showItem.id,
      name: this.showItem.name,
      thumbnail: this.showItem.thumbnail,
      routeType: this.showItem.routeType,
    } as QlikApp;
    this.qlikApiService.addRecentlyUsed(qlikApp);
    // this.qlikApiService.addRecentlyUsed(showitem);
  }
}
