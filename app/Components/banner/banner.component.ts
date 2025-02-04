import { Component, Input, SimpleChanges } from '@angular/core';
import { QlikApp } from '../../Types/QlikAPP';
import { ShowItemComponent } from '../show-item/show-item.component';
import { NgFor, NgIf } from '@angular/common';
import { QlikSpace } from '../../Types/QlikSpace';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [ShowItemComponent, NgFor, NgIf],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
})
export class BannerComponent {
  @Input() appNames: QlikApp[] = [];
  @Input() spaces: QlikSpace[] = [];
  @Input() title = '';
  combinedItems: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    // Combine appNames and spaces arrays
    if (changes['appNames'] || changes['spaces']) {
      this.combinedItems = [...this.appNames, ...this.spaces];
      console.log('Updated combinedItems:', this.combinedItems);
    }
  }
}
