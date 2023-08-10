import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { allHotels } from '../../../../app-data/hotels'
import { places } from '../../../../app-data/places'
import { asyncScheduler, fromEvent, throttleTime } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './mainList.component.html',
})
export class MainListComponent {

  allPlaces: Place[] = places;
  allHotels = allHotels as HotelsData;

  buscarBtnLabel = 'Buscar';
  inputValue?: string;
  cards = allHotels[0].hotels;
  filteredHotels: Hotel[] = [];
  hotelsInPlace?: Hotel[];
  perPage = 5;
  sortBy = 'recomendado';
  endList = false;

  constructor(
    private route: ActivatedRoute,
  ) {
    route.queryParams.subscribe(params => {
      if (params['sortBy']) {
        this.sortBy = params['sortBy'];
      }
      if (params['placeId']) {
        this.buscarBtnLabel = 'Alterar Busca';
        const currentPlace = this.allPlaces.find(el => el.placeId == params['placeId']);
        if (currentPlace) {
          this.inputValue = `${currentPlace.name}, ${currentPlace.state.shortname}`;
        }

        this.filterHotels(params['placeId'], this.sortBy);
      }
    })
    this.listenToScroll()
  }

  filterHotels(placeId: string, sortBy: string) {
    let sortAction = new Map<string, (a: Hotel, b: Hotel) => number>()
        .set('avaliado', (a: Hotel, b: Hotel) => parseInt(b.stars) - parseInt(a.stars))
        .set('recomendado', (a: Hotel, b: Hotel) => parseInt(b.stars) - parseInt(a.stars))
    
    this.hotelsInPlace = allHotels.find(h => h.placeId == parseInt(placeId))?.hotels as Hotel[];
    this.hotelsInPlace.sort(sortAction.get(sortBy)!);
    
    this.getMoreHotels(true);
  }

  getMoreHotels(isInit?: boolean) {
    let size = this.filteredHotels.length + this.perPage;
    if (isInit) {
      size = this.perPage;
    }
    // if (this.hotelsInPlace?.length) {
      this.filteredHotels = this.hotelsInPlace?.slice(0, size)!;
      if (this.filteredHotels.length === this.hotelsInPlace?.length) {
        this.endList = true;
      }
    // }
    // console.log(this.filteredHotels);
    
  }

  listenToScroll() {
    fromEvent(document, 'scroll').pipe(throttleTime(100, asyncScheduler, { trailing: true })).subscribe((e: Event) => {
      // console.log(e);
      let scrollFromBottom = document.documentElement.scrollHeight - ( document.documentElement.clientHeight + window.scrollY );
      if (scrollFromBottom < 150) {
        this.getMoreHotels();
      }
    })
  }
}

export interface Place {
  name: string;
  state: {
      name: string;
      shortname: string;
    },
  placeId: number;
}

export interface Hotel {
  id: number;
  favorite: boolean;
  name: string,
  description: string;
  stars: string;
  thumb: string;
  amenities: { key: string, label: string }[];
  hasBreakFast: boolean;
  hasRefundableRoom: boolean;
  hasAgreement: boolean;
  nonRefundable: boolean | null;
  address: {
    street: string;
    number: string;
    district: string;
    city: string;
    state: string;
    country: string;
    zipCode: string | null;
    fullAddress: string;
  },
  images: string[];
  deals: any;
  roomsQuantity: number;
}

export interface HotelMap {
  hotels: Hotel[];
  placeId: number;
}

export type HotelsData = HotelMap[];
