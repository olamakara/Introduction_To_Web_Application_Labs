import { DatabaseService } from './../database.service';
import { MainPageComponent } from './../main-page/main-page.component';
import { Component } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';
import { BasketServiceService } from '../basket-service.service';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    public basketService: BasketServiceService,
    public fireBase: DatabaseService
  ) { }

  pay(index: number) {
    let flaga = true;
    let boughtTrip = this.basketService.basket[index];
    let placeInHistory = this.basketService.historyTrips.indexOf(boughtTrip);
    for (let i = 0; i < this.basketService.historyTrips.length; i++) {
      if (this.basketService.historyTrips[i].id == boughtTrip.id) {
        this.basketService.historyTripsCount[i] += 1;
        flaga = false;
      }
    }
    if (flaga) {
      this.basketService.historyTrips.push(boughtTrip);
      this.basketService.historyTripsCount.push(1);
    }
    this.cardService.boughtTrip(boughtTrip);
    this.cardService.findNextTrip();
    this.fireBase.changeMaxAmountOfPlaces(this.basketService.basket[index].id);
    this.basketService.basket.splice(index, 1);
  }
}
