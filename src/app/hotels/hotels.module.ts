import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Pipes
import { EncodeUriPipe } from '../pipes/encodeUri.pipe';
// Components
import { MainListComponent } from './main/mainList.component';
import { FilterComponent } from './filter/filter.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
// ng-zorro
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

const routes: Routes = [
  {
    path: '',
    component: MainListComponent
  }
];

@NgModule({
  declarations: [
    FilterComponent,
    MainListComponent,
    ListComponent,
    EncodeUriPipe,
    DetailComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzAutocompleteModule,
    NzCarouselModule,
    FormsModule,
    NzIconModule.forChild([]),
    NzDrawerModule
  ]
})
export class HotelsModule { }
