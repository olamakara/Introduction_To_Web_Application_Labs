import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';
import { BoughtTrip } from '../IBoughtTrip';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    public auth: AuthService,
    public fireBase: DatabaseService
  ) { }

  nextTripNotification: string = "Brak wycieczek w najbliższym czasie";
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

  findNextTrip() {
    let date = new Date();
    let userUid = this.auth.userData.uid;
    let today =  date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    let difference = Infinity;
    for (let trip of this.boughtTrips) {
      let date1 = new Date(trip.start);
      let date2 = new Date(today);
      // return today;
      if (date1.getTime() - date2.getTime() < difference && date2 < date1 && userUid == trip.uid) {
        difference = date1.valueOf() - date2.valueOf();
        this.nextTripNotification = "Najbliższa wycieczka: " + trip.tripName;
      }
    }
    return this.nextTripNotification;
  }
}
