import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RoutingModule } from './routing/routing.module';
import { HomeComponent } from './home/home.component';
import { AddUrlComponent } from './add-url/add-url.component';
import { BrokenUrlsComponent } from './broken/broken-urls.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddUrlComponent,
    BrokenUrlsComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
