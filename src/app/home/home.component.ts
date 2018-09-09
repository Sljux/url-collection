import { Component, OnInit } from '@angular/core';
import { UrlService } from '../services/url.service';
import { Url } from '../models/url';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  urls: Url[];

  constructor(private urlService: UrlService) {
  }

  ngOnInit() {
    this.urls = this.urlService.getUrls();
  }
}
