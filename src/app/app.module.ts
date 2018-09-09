import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { AddUrlComponent } from './add-url/add-url.component';
import { BrokenUrlsComponent } from './broken/broken-urls.component';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { UrlListComponent } from './url-list/url-list.component';
import { MomentModule } from 'ngx-moment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUrlComponent,
    BrokenUrlsComponent,
    HeaderComponent,
    UrlListComponent,
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    MomentModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
