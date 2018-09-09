import { getTestBed, TestBed } from '@angular/core/testing';
import { STORAGE_KEY, UrlService } from './url.service';
import { Url } from '../models/url';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

function mockLocalStorage() {
  let store = {};

  const mockedLocalStorage = {
    getItem: (key: string): string => {
      return key in store ? store[key] : null;
    },
    setItem: (key: string, value: string) => {
      store[key] = `${value}`;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    }
  };

  spyOn(localStorage, 'getItem')
    .and.callFake(mockedLocalStorage.getItem);
  spyOn(localStorage, 'setItem')
    .and.callFake(mockedLocalStorage.setItem);
  spyOn(localStorage, 'removeItem')
    .and.callFake(mockedLocalStorage.removeItem);
  spyOn(localStorage, 'clear')
    .and.callFake(mockedLocalStorage.clear);
}

describe('UrlService', () => {
  let injector: TestBed;
  let service: UrlService;
  let httpMock: HttpTestingController;

  const name = 'website name';
  const address = 'http://www.google.com';
  const description = 'description';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UrlService]
    });

    injector = getTestBed();
    service = injector.get(UrlService);
    httpMock = injector.get(HttpTestingController);

    mockLocalStorage();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add url successfully in-memory storage', () => {
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    expect(url.name).toEqual(name);
    expect(url.address).toEqual(address);
    expect(url.description).toEqual(description);
  });

  it('should add url successfully to local storage', () => {
    service.addUrl(name, address, description);

    const url: Url = JSON.parse(localStorage.getItem(STORAGE_KEY))[0];

    expect(url.name).toEqual(name);
    expect(url.address).toEqual(address);
    expect(url.description).toEqual(description);
  });

  it('should add current time as last visited on add', () => {
    const now = Date.now();
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    expect(url.lastVisit).toBeCloseTo(now, 1);
  });

  it('should add http:// to start of address if not present', () => {
    const addressWithoutProtocol = 'www.google.com';

    service.addUrl(name, addressWithoutProtocol, description);

    const url = service.getUrls()[0];

    expect(url.address).toEqual('http://' + addressWithoutProtocol);
  });

  it('should remove url successfully from in-memory storage', () => {
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    service.removeUrl(url);

    expect(service.getUrls().length).toEqual(0);
  });

  it('should remove url successfully from local storage', () => {
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    service.removeUrl(url);

    const fromStorage = JSON.parse(localStorage.getItem(STORAGE_KEY));

    expect(Array.isArray(fromStorage)).toEqual(true);
    expect(fromStorage.length).toEqual(0);
  });

  it('should update last visit timestamp on touch', (done) => {
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];
    const timestamp = url.lastVisit;
    const timeout = 1000;

    setTimeout(() => {
      service.touchUrl(url);

      expect(url.lastVisit).toBeCloseTo(timeout + timestamp, -5);

      done();
    }, timeout);
  });

  it('should open url in new tab', () => {
    spyOn(window, 'open');

    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    service.openUrl(url);

    expect(window.open).toHaveBeenCalledWith(url.address, '_blank');
  });

  it('should fail to check if link is valid due to CORS', (done) => {
    service.addUrl(name, address, description);

    const url = service.getUrls()[0];

    service.checkUrl(url)
      .then((valid) => {
        expect(valid).toEqual(false);
        done();
      });

    const req = httpMock.expectOne(url.address);
    expect(req.request.method).toEqual('HEAD');
    req.error(null);
  });
});
