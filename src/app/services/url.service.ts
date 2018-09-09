import { Injectable } from '@angular/core';
import { isUrl, Url } from '../models/url';
import { HttpClient } from '@angular/common/http';

const storageKey = 'url-coll';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  private _urls: Url[];

  getUrls(): Url[] {
    return this._urls.slice(0);
  }

  constructor(private http: HttpClient) {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      this._urls = urlsFromStorage();
    } catch (e) {
      console.error(e);

      this._urls = [];
    }
  }

  addUrl(name: string, address: string, description?: string) {
    if (!address.startsWith('http')) {
      address = 'http://' + address;
    }

    this._urls.push({ name, address, description, lastVisit: Date.now() });
    this.saveUrls();
  }

  removeUrl(url: Url) {
    const index = this.urlIndex(url);

    this._urls.splice(index, 1);
    this.saveUrls();
  }

  touchUrl(url: Url) {
    const index = this.urlIndex(url);

    this._urls[index].lastVisit = Date.now();
    this.saveUrls();
  }

  openUrl(url: Url) {
    window.open(url.address, '_blank');
    this.touchUrl(url);
  }

  checkUrl(url: Url): Promise<boolean> {
    // Will fail on different hosts  due to CORS
    return this.http.head(url.address).toPromise()
      .then(() => true)
      .catch(() => false);
  }

  private urlIndex(url: Url) {
    const index = this._urls.indexOf(url);

    if (index === -1) {
      throw new Error('URL not saved');
    }
    return index;
  }

  private saveUrls() {
    localStorage.setItem(storageKey, JSON.stringify(this._urls));
  }

}

function urlsFromStorage(): Url[] {
  let items: any[];

  try {
    const storageItem = localStorage.getItem(storageKey);

    if (storageItem == null) {
      return [];
    }

    items = JSON.parse(storageItem);
  } catch (e) {
    throw new Error('Local storage data not valid JSON');
  }

  if (!Array.isArray(items)) {
    throw new Error('Local storage data not an array');
  }

  if (items.some(i => !isUrl(i))) {
    throw new Error('Local storage data corrupted');
  }

  return items;
}

