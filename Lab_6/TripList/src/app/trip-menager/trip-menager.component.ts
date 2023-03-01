import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasketServiceService } from '../basket-service.service';
import { CurrencyServiceService } from '../currency-service.service';
import { DatabaseService } from '../database.service';
import { Trip } from '../ITrip';
import { TripCardServiceService } from '../trip-card-service.service';

@Component({
  selector: 'app-trip-menager',
  templateUrl: './trip-menager.component.html',
  styleUrls: ['./trip-menager.component.css']
})

export class TripMenagerComponent {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    public basketService: BasketServiceService,
    public fireBase: DatabaseService
) { }

  trips: any[] = [];
  tripsSub: Subscription | undefined;
  currentImagesIndexes: number[] = [];

  ngOnInit() {
      this.tripsSub = this.fireBase.getTrips().subscribe(change => {
          this.trips = []
          for (let trip of change) {
            this.trips.push({
              id: trip.id,
              rate: trip.rate,
              numberOfRates: trip.numberOfRates,
              tripName: trip.tripName,
              country: trip.country,
              start: trip.start,
              end: trip.end,
              price: trip.price,
              numberOfPlaces: trip.numberOfPlaces,
              maxAmountOfPlaces: trip.maxAmountOfPlaces,
              description: trip.description,
              img: trip.img
            } as Trip);
            this.currentImagesIndexes.push(0);
            // this.maxAmountOfPlaces.push(trip.maxAmountOfPlaces);
            // this.cardService.inicialize(trip.maxAmountOfPlaces);
          }
        });
  }

  ngOnDestroy() {
      this.tripsSub?.unsubscribe();
  }

  toInt(string: string) {
    return parseInt(string);
  }

  // changeCountry(id: number, newValue: string) {
  //   this.country = newValue;
  //   this.fireBase.changeCountry(id, newValue);
  // }

  changePlaces(id: number, places: number) {
    this.fireBase.changeNumberOfPlaces(id, places);
    this.fireBase.updateMaxAmountOfPlaces(id, places);
  }

  // nextSlide(trip: Trip) {
  //   this.slideIndex = (this.slideIndex + 1) % trip.img.length;
  // }

  // previousSlide(trip: Trip) {
  //   let change = trip.img.length;
  //   this.slideIndex = (this.slideIndex + change - 1) % change;
  // }
}
