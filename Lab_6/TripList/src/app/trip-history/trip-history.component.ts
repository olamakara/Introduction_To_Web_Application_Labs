import { TripCardServiceService } from './../trip-card-service.service';
import { AuthService } from './../auth.service';
import { CurrencyServiceService } from './../currency-service.service';
import { BasketServiceService } from './../basket-service.service';
import { Component } from '@angular/core';
import { Trip } from '../ITrip';
import { BoughtTrip } from '../IBoughtTrip';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})

export class TripHistoryComponent {

  constructor(
    public basketService: BasketServiceService,
    public currencyConverter: CurrencyServiceService,
    public auth: AuthService,
    public cardService: TripCardServiceService,
    public fireBase: DatabaseService
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

  currentDate = new Date();
  today = this.currentDate.getFullYear() + "-" + (this.currentDate.getMonth() + 1) + "-" + this.currentDate.getDate();

  checkIfHistory: boolean = true;
  checkIfNow: boolean = true;
  checkIfBefore: boolean = true;

  ifHistory() {
    this.checkIfHistory = true;
    this.checkIfBefore = false;
    this.checkIfNow = false;
  }

  ifNow() {
    this.checkIfHistory = false;
    this.checkIfBefore = false;
    this.checkIfNow = true;
  }

  ifBefore() {
    this.checkIfHistory = false;
    this.checkIfBefore = true;
    this.checkIfNow = false;
  }

  all() {
    this.checkIfHistory = true;
    this.checkIfBefore = true;
    this.checkIfNow = true;
  }

  checkHistory(trip: Trip) {
    if (this.checkIfHistory && trip.end < this.today) {
      return false;
    }
    return true;
  }

  checkNow(trip: Trip) {
    if (this.checkIfNow && trip.start <= this.today && this.today <= trip.end) {
      return false;
    }
    return true;
  }

  checkBefore(trip: Trip) {
    if (this.checkIfBefore && trip.start > this.today) {
      return false;
    }
    return true;
  }

  checkAll() {
    if (this.checkIfBefore && this.checkIfHistory && this.checkIfNow) {
      return false;
    }
    return true;
  }
}
