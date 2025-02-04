import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { QlikApiService } from '../../../services/qlik-api.service';
import { BannerComponent } from '../banner/banner.component';
import { QlikApp } from '../../Types/QlikAPP';
import { NgFor, NgIf } from '@angular/common';
import { CarouselModule } from 'primeng/carousel';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-qlik-app',
  standalone: true,
  imports: [BannerComponent, NgFor, NgIf, CarouselModule, RouterModule],
  templateUrl: './qlik-app.component.html',
  styleUrl: './qlik-app.component.scss',
})
export class QlikAppComponent {
  qlikApps: QlikApp[] = [];
  title: string = 'Qlik Apps';
  //recentlyUsedApps: QlikApp[] = [];
  constructor(private qlikAppService: QlikApiService) {}

  ngOnInit() {
    this.qlikAppService.getApps().then((apps) => {
      console.log('apps', apps);
      this.qlikApps = apps;
    });

    this.qlikAppService.getMasterItems().then((app)=>{
      console.log('app data ',app)
    })
    /* this.qlikAppService.recentlyUsedApps$.subscribe(apps => {
      this.recentlyUsedApps = apps;
      console.log('Updated recently used apps:', apps);
    });*/
  }

  getDetailLink(appItem: any): string {
    if (!appItem) {
      return '';
    }

    // Check the type of showItem and return appropriate link
    if (appItem?.routeType == 'space') {
      return 'space-detail/' + appItem?.id;
    } else if (appItem?.routeType == 'app') {
      return appItem?.link;
    }

    // Default or fallback link
    return appItem?.link;
  }
}
//qlikAppNames$ = this.qlikAppService.getAppnames();
