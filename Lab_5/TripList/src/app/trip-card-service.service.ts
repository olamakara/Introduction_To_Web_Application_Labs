import { MainPageComponent } from './main-page/main-page.component';
import { DatabaseService } from './database.service';
import { Trip } from './ITrip';
import { Injectable, OnInit } from '@angular/core';
import { BasketServiceService } from './basket-service.service';
import { reviews } from './Reviews';

@Injectable({
  providedIn: 'root'
})

export class TripCardServiceService {

  constructor(
    public basketService: BasketServiceService,
    private fireBase: DatabaseService
  ) { }

  reviews = reviews;
  sumOfTrips: number = 0;
  priceOfTrips: number = 0;
  index = 0;
  nextTripNotification: string = "Brak wycieczek w najbliższym czasie";
  sumtripRating: number = 0;
  ratingCount: number = 0;
  // currentAverage: number = 0;

  trips: Trip[] = [];
  maxAmountOfPlaces: number[] = [];

  inicialize(numberOfPlaces: number) {
    this.maxAmountOfPlaces.push(numberOfPlaces);
  }

  // getTrip(index: number) {
  //   return this.trips[index];
  // }

  getTripIndex(trip: Trip) {
    this.index = 0;
    for (let item of this.trips) {
      if (item == trip) {
        return this.index;
      }
      this.index += 1;
    }
    return 0;
  }

  boughtTrip(trip: Trip) {
    this.maxAmountOfPlaces[this.getTripIndex(trip)]--;
    this.sumOfTrips--;
    this.priceOfTrips -= trip.price;
  }

  findNextTrip() {
    let tripArray = this.basketService.historyTrips;
    let nextTrip = tripArray[0];
    let date = new Date();
    let today =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let difference = Infinity;
    for (let trip of tripArray) {
      let date1 = new Date(trip.start);
      let date2 = new Date(today);
      if (date1.getTime() - date2.getTime() < difference && today < trip.start) {
        difference = date1.valueOf() - date2.valueOf();
        this.nextTripNotification = "Najbliższa wycieczka: " + trip.tripName;
      }
    }
  }

  makeFakeArray(counter: number) {
    let fakeArray = [];
    counter = Math.round(counter); 
    for (let i = 0; i < counter; i++) {
      fakeArray.push(0);
    }
    return fakeArray;
  }

  // rateAverage() {
  //   this.currentAverage = this.sumtripRating / this.ratingCount;
  // }

  currentAverage(tripName: string) {
    let numOfRates = 0;
    let sumOfRates = 0;
    for (let review of this.reviews) {
      if (review.tripName == tripName && review.rate != 0) {
        numOfRates++;
        sumOfRates += review.rate;
      }
    }
    if (numOfRates == 0) {
      return 0;
    }
    return Math.round(sumOfRates / numOfRates * 100) / 100;
  }
}
