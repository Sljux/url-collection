import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddUrlComponent } from '../add-url/add-url.component';
import { BrokenUrlsComponent } from '../broken/broken-urls.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add-url', component: AddUrlComponent },
  { path: 'broken', component: BrokenUrlsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
