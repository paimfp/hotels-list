import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { Hotel } from '../main/mainList.component';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { DetailComponent } from '../detail/detail.component';
import { NzDrawerService } from 'ng-zorro-antd/drawer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @Input() hotels?: Hotel[];
  @Input() endList = false;

  @ViewChildren('carousels', { read: NzCarouselComponent }) carousels?: QueryList<NzCarouselComponent>;

  constructor(
    private drawerService: NzDrawerService,
  ) {}

  ngOnInit() {}

  nextPhoto(carouselIdx: number) {
    this.carousels?.toArray()[carouselIdx].next();
  }
  prevPhoto(carouselIdx: number) {
    this.carousels?.toArray()[carouselIdx].pre();
  }

  openDetail(i: number) {
    console.log(i);
    const drawerRef = this.drawerService.create<DetailComponent, { hotelData: Hotel }, string>({
      // nzTitle: 'Component',
      // nzFooter: 'Footer',
      // nzExtra: 'Extra',
      nzContent: DetailComponent,
      nzContentParams: {
        hotelData: this.hotels![i],
      },
      nzWidth: 1000,
      nzClosable: false
    });

    drawerRef.afterOpen.subscribe(() => {
    });

    drawerRef.afterClose.subscribe(data => {      
        // this.value = data;
    });
  }

}
