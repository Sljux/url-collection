import { Component } from '@angular/core';
import { UrlService } from '../services/url.service';
import { Url } from '../models/url';

@Component({
  selector: 'app-broken',
  templateUrl: './broken-urls.component.html',
  styleUrls: ['./broken-urls.component.scss']
})
export class BrokenUrlsComponent {

  brokenUrls: Url[] = [];
  loading = false;

  constructor(private urlService: UrlService) {
  }

  async testUrls() {
    const urls = this.urlService.getUrls();

    this.loading = true;

    const results = await Promise.all(urls.map(url => this.urlService.checkUrl(url)));

    this.brokenUrls = urls.filter((_, i) => !results[i]);

    this.loading = false;
  }

}
