import { Trip } from './../ITrip';
// import { trips } from './../Trips';
import { BoughtTrip } from './../IBoughtTrip';
import { AuthService } from './../auth.service';
import { DatabaseService } from './../database.service';
import { MainPageComponent } from './../main-page/main-page.component';
import { Component, OnInit } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';
import { BasketServiceService } from '../basket-service.service';
import { Subscription } from 'rxjs';
import { User } from '../User';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})

export class BasketComponent implements OnInit {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    public basketService: BasketServiceService,
    public fireBase: DatabaseService,
    public auth: AuthService
  ) { }

  boughtTrips: any[] = [];
  tripsSub: Subscription | undefined;

  ngOnInit(): void {
    this.tripsSub = this.fireBase.getHistoryTrips().subscribe(change => {
      this.boughtTrips = []
      for (let boughtTrip of change) {
        this.boughtTrips.push({
          id: boughtTrip.id,
          uid: boughtTrip.uid,
          rate: boughtTrip.rate,
          places: boughtTrip.places,
          tripId: boughtTrip.tripId,
          tripName: boughtTrip.tripName,
          country: boughtTrip.country,
          start: boughtTrip.start,
          end: boughtTrip.end,
          price: boughtTrip.price,
          userNick: boughtTrip.userNick,
          opinion: boughtTrip.opinion,
          date: boughtTrip.date
        } as BoughtTrip);
      }
    });
  }

  ngOnDestroy() {
    this.tripsSub?.unsubscribe();
  } 

    pay(index: number) {
    let flaga = true;
    let userUid = this.auth.userData.uid;
    let boughtTrip = this.basketService.basket[index];
    for (let i = 0; i < this.boughtTrips.length; i++) {
      let one = this.boughtTrips[i].tripId;
      let two: any;
      two = boughtTrip.id;
      let three = this.boughtTrips[i].uid;
      if (one == two && three == userUid) {
        this.fireBase.addPlaceToHistoryTrip(this.boughtTrips[i].id);
        flaga = false;
      }
    }
    if (flaga) {
      let tripToAdd = {
        id: this.fireBase.getNextHistoryIndex(),
        uid: userUid,
        rate: 0,
        places: 1,
        tripId: boughtTrip.id,
        tripName: boughtTrip.tripName,
        country: boughtTrip.country,
        start: boughtTrip.start,
        end: boughtTrip.end,
        price: boughtTrip.price,
        userNick: "",
        opinion: "",
        date: ""
      } as BoughtTrip;
      this.fireBase.addTripToHistory(tripToAdd);
    }
    this.cardService.boughtTrip(boughtTrip);
    // this.cardService.findNextTrip(this.boughtTrips);
    this.fireBase.changeMaxAmountOfPlaces(boughtTrip.id);
    this.basketService.basket.splice(index, 1);
  }

}
