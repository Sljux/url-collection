import { Injectable } from '@angular/core';
import { isUrl, Url } from '../models/url';

const storageKey = 'url-coll';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  urls: Url[];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      this.urls = urlsFromStorage();
    } catch (e) {
      this.urls = [];
    }
  }

  addUrl(name: string, address: string, description?: string) {
    this.urls.push({ name, address, description, lastVisit: Date.now() });

    saveUrlsToStorage(this.urls);
  }

  removeUrl(url: Url) {
    const index = this.urls.indexOf(url);

    if (index === -1) {
      throw new Error('URL not saved');
    }

    this.urls.splice(index, 1);
    saveUrlsToStorage(this.urls);
  }

}

function urlsFromStorage(): Url[] {
  let items: any[];

  try {
    items = JSON.parse(localStorage.getItem(storageKey));
  } catch (e) {
    throwCorruptedDataError();
  }

  if (!Array.isArray(items)) {
    throwCorruptedDataError();
  }

  if (items.some(i => !isUrl(i))) {
    throwCorruptedDataError();
  }

  return items;
}

function saveUrlsToStorage(urls: Url[]) {
  localStorage.setItem(storageKey, JSON.stringify(urls));
}

function throwCorruptedDataError() {
  throw new Error('Local storage data corrupted');
}
