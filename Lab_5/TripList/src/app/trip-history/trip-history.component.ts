import { CurrencyServiceService } from './../currency-service.service';
import { BasketServiceService } from './../basket-service.service';
import { Component } from '@angular/core';
import { Trip } from '../ITrip';

@Component({
  selector: 'app-trip-history',
  templateUrl: './trip-history.component.html',
  styleUrls: ['./trip-history.component.css']
})

export class TripHistoryComponent {

  constructor(
    public basketService: BasketServiceService,
    public currencyConverter: CurrencyServiceService
  ) { }

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
