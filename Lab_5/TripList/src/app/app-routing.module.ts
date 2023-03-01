import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasketComponent } from './basket/basket.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { TripInfoComponent } from './trip-info/trip-info.component';

const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'offer', component: MainPageComponent },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'offer/:id', component: TripInfoComponent },
  { path: 'history', component: TripHistoryComponent },
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
