import { TripCardServiceService } from './trip-card-service.service';
import { Injectable } from '@angular/core';
import { Trip } from './ITrip';

@Injectable({
  providedIn: 'root'
})

export class BasketServiceService {

  constructor(
    
  ) { }

  basket: Trip[] = [];

  // historyTrips: Trip[] = [];
  // historyTripsCount: number[] = [];
  // nextTripNotification: string = "Brak wycieczek w najbliższym czasie";

  // findNextTrip() {
  //   let tripArray = this.historyTrips;
  //   let nextTrip;
  //   let date = new Date();
  //   let today =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  //   let difference = Infinity;
  //   for (let trip of tripArray) {
  //     let date1 = new Date(trip.start);
  //     let date2 = new Date(today);
  //     if (date1.valueOf() - date2.valueOf() < difference) {
  //       nextTrip = trip;
  //       difference = date1.valueOf() - date2.valueOf();
  //     }
  //     if (difference < Infinity) {
  //       this.nextTripNotification = "Najbliższa wycieczka: " + trip.tripName;
  //     }
  //   }
  // }
}
