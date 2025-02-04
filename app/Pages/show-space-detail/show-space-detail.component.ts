import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QlikApiService } from '../../../services/qlik-api.service';
import { TabViewModule } from 'primeng/tabview';
import { Space } from '@qlik/api/spaces';
import { DatePipe, NgIf } from '@angular/common';
import { QlikApp } from '../../Types/QlikAPP';
import { BannerComponent } from '../../Components/banner/banner.component';

@Component({
  selector: 'app-show-space-detail',
  standalone: true,
  imports: [TabViewModule, NgIf, BannerComponent],
  templateUrl: './show-space-detail.component.html',
  styleUrl: './show-space-detail.component.scss',
  providers: [DatePipe],
})
export class ShowSpaceDetailComponent {
  spaceId = '';
  space: Space | null = null;
  qlikAppsBySpaceId: QlikApp[] = [];
  constructor(
    private route: ActivatedRoute,
    private qlikAPIService: QlikApiService,
    private datePipe: DatePipe,
  ) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.route.paramMap.subscribe((params) => {
      console.log('spaceid', params.get('id'));
      this.spaceId = params.get('id')?.toString() || '';
      this.qlikAPIService.getAppsBySpaceId(this.spaceId).then((apps) => {
        this.qlikAppsBySpaceId = apps;
      });
      this.qlikAPIService.getSpacebyId(this.spaceId).then((space) => {
        this.space = space;
      });
    });
  }

  formatDate(date: string | undefined): string {
    return this.datePipe.transform(date, 'dd.MM.yyyy') || 'Invalid Date';
  }
}
