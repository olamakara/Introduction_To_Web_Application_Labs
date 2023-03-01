import { AdminGuard } from './guard/admin.guard';
import { AdminViewComponent } from './admin-view/admin-view.component';
import { MenagerGuard } from './guard/menager.guard';
import { AuthGuard } from './guard/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartPageComponent } from './start-page/start-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AddTripComponent } from './add-trip/add-trip.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BasketComponent } from './basket/basket.component';
import { TripHistoryComponent } from './trip-history/trip-history.component';
import { TripInfoComponent } from './trip-info/trip-info.component';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TripMenagerComponent } from './trip-menager/trip-menager.component';

const routes: Routes = [
  { path: 'start', component: StartPageComponent },
  { path: 'offer', component: MainPageComponent },
  { path: 'trip-menager', component: TripMenagerComponent, canActivate: [MenagerGuard] },  // tylko menager
  { path: 'admin-view', component: AdminViewComponent },  // canActivate: [AdminGuard]
  { path: 'basket', component: BasketComponent, canActivate: [AuthGuard] },
  { path: 'offer/:id', component: TripInfoComponent, canActivate: [AuthGuard] },
  { path: 'history', component: TripHistoryComponent, canActivate: [AuthGuard] },
  { path: 'log-in', component: LogInComponent },  // tylko niezalogowany
  { path: 'sign-up', component: SignUpComponent },  // tylko niezalogowany
  { path: '', redirectTo: '/start', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
