import { Component } from '@angular/core';
import { QlikApp } from '../../Types/QlikAPP';
import { QlikApiService } from '../../../services/qlik-api.service';
import { NgIf } from '@angular/common';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-view-all-qlik-apps',
  standalone: true,
  imports: [NgIf, BannerComponent],
  templateUrl: './view-all-qlik-apps.component.html',
  styleUrl: './view-all-qlik-apps.component.scss',
})
export class ViewAllQlikAppsComponent {
  qlikApps: QlikApp[] = [];
  constructor(private qlikAppService: QlikApiService) {}
  ngOnInit() {
    this.qlikAppService.getApps().then((apps) => {
      console.log('apps', apps);
      this.qlikApps = apps;
    });
    /* this.qlikAppService.recentlyUsedApps$.subscribe(apps => {
      this.recentlyUsedApps = apps;
      console.log('Updated recently used apps:', apps);
    });*/
  }
}
