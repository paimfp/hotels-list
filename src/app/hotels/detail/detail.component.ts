import { Component, ViewChild } from '@angular/core';
import { Hotel } from '../main/mainList.component';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {

  hotelData!: Hotel;
  currentImgIdx = 0;

  @ViewChild('carousel', { read: NzCarouselComponent }) carousel!: NzCarouselComponent;

  ngAfterViewInit() {
    this.carousel.nzAfterChange.subscribe(index => {
      this.currentImgIdx = index;
    })
    
  }

  nextPhoto() {
    this.carousel.next();
  }
  prevPhoto() {
    this.carousel.pre();
  }

}
