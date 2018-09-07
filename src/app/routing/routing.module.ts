import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { AddUrlComponent } from '../add-url/add-url.component';
import { BrokenUrlsComponent } from '../broken/broken-urls.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'add-url', component: AddUrlComponent },
  { path: 'broken', component: BrokenUrlsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutingModule {
}
