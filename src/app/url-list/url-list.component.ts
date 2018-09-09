import { Component, Input, OnInit } from '@angular/core';
import { Url } from '../models/url';
import { UrlService } from '../services/url.service';

export enum SortOption {
  name,
  lastVisited
}

@Component({
  selector: 'app-url-list',
  templateUrl: './url-list.component.html',
  styleUrls: ['./url-list.component.scss']
})
export class UrlListComponent implements OnInit {

  @Input() set urls(value: Url[]) {
    this._urls = value;
    this.sort();
  }

  _urls: Url[] = [];

  selectedSort = SortOption.lastVisited;
  SortOption = SortOption;

  constructor(private urlService: UrlService) {
  }

  ngOnInit() {
    this.sort();
  }

  sort() {
    this._urls.sort(this.sortFn);
  }

  private get sortFn() {
    switch (this.selectedSort) {
      case SortOption.lastVisited:
        return (a, b) => b.lastVisit - a.lastVisit;

      case SortOption.name:
        return (a, b) => a.name.localeCompare(b.name);
    }
  }

  open(url: Url) {
    this.urlService.openUrl(url);
    this.sort();
  }

  remove(index: number) {
    this.urlService.removeUrl(this.urls[index]);
    this._urls.splice(index, 1);
  }

}
