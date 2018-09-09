import { Component, ViewChild } from '@angular/core';
import { UrlService } from '../services/url.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-url',
  templateUrl: './add-url.component.html',
  styleUrls: ['./add-url.component.scss']
})
export class AddUrlComponent {

  @ViewChild('form') form: NgForm;

  name = '';
  address = '';
  description: '';

  constructor(private urlService: UrlService,
              private router: Router) {
  }

  clearUrl() {
    this.name = '';
    this.address = '';
    this.description = '';

    this.form.resetForm();
  }

  saveUrl() {
    this.urlService.addUrl(this.name, this.address, this.description);
    return this.router.navigateByUrl('home');
  }
}
