import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../main/mainList.component';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input() inputValue?: Place | string = '';
  @Input() allPlaces: Place[] = [];
  @Input() buscarBtnLabel!: string;
  @Input() sortBy?: string;
  
  options: Place[] = [];

  constructor(
    private router: Router
  ) {}

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.options = this.allPlaces.filter(place => ~(place.name.toLowerCase()).indexOf(value.toLowerCase()));
  }

  submitFilter() {
    if ( !(typeof this.inputValue == 'string')) {
      this.router.navigate(['.'], { queryParams: { placeId: this.inputValue?.placeId }, queryParamsHandling: 'merge' });
    }
  }

  submitOrder() {
    this.router.navigate(['.'], { queryParams: { sortBy: this.sortBy }, queryParamsHandling: 'merge' })
  }

  compareFun = (o1: Place | string, o2: Place): boolean => {
    if (o1) {
      return typeof o1 === 'string' ? !!~(o2.name.toLowerCase()).indexOf(o1.toLowerCase()) : o1.placeId === o2.placeId;
    } else {
      return false;
    }
  };
}
