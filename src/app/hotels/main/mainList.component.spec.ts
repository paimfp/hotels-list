import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainListComponent } from './mainList.component';

describe('MainListComponent', () => {
  let component: MainListComponent;
  let fixture: ComponentFixture<MainListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainListComponent]
    });
    fixture = TestBed.createComponent(MainListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
