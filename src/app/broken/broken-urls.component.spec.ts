import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokenUrlsComponent } from './broken-urls.component';

describe('BrokenUrlsComponent', () => {
  let component: BrokenUrlsComponent;
  let fixture: ComponentFixture<BrokenUrlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrokenUrlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrokenUrlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
