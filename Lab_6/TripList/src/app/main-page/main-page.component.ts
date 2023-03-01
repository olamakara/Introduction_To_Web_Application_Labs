import { DatabaseService } from './../database.service';
import { Component, OnInit } from '@angular/core';
import { Trip } from '../ITrip';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';
import { BasketServiceService } from '../basket-service.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
  })

export class MainPageComponent implements OnInit {
    
    constructor(
        public currencyConverter: CurrencyServiceService,
        public cardService: TripCardServiceService,
        public basketService: BasketServiceService,
        private fireBase: DatabaseService
    ) { }

    trips: any[] = [];
    tripsSub: Subscription | undefined;
    maxAmountOfPlaces: any[] = [];
    maxPlaces: number[] = [];

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
              this.maxAmountOfPlaces.push(trip.maxAmountOfPlaces);
              this.cardService.inicialize(trip.maxAmountOfPlaces);
            }
          });
    }

    ngOnDestroy() {
        this.tripsSub?.unsubscribe();
    }

    minPrice(price: number) {
        const tripsCopy = [... this.trips];
        return price === tripsCopy.sort((a, b) => a.price - b.price)[0].price;
      }
    
    maxPrice(price: number) {
        const tripsCopy = [... this.trips];
        return price === tripsCopy.sort((a, b) => a.price - b.price)[tripsCopy.length - 1].price;
    }

    changeOpacity(amount: number) {
        return amount < 4;
    }

    changeBackground(){
        return this.cardService.sumOfTrips >= 10;
    }
    
    ifNoPlaces(index: number) {
        return this.trips[index].numberOfPlaces == 0;
    }

    deleteTrip(index: number, id: number) {
        this.fireBase.removeTrip(id);
    }

    addCard($event: number) {
        this.maxAmountOfPlaces.push($event);
    }

    addTrip(index: number) {
        if (this.trips[index].numberOfPlaces > 0) {
            this.cardService.sumOfTrips++;
            this.cardService.priceOfTrips += this.trips[index].price;
            this.trips[index].numberOfPlaces--;
            this.basketService.basket.push(this.trips[index]);
            this.fireBase.changeNumberOfPlaces(this.trips[index].id, this.trips[index].numberOfPlaces);
        }
      }
    
      removeTrip(index: number) {
        if (this.trips[index].numberOfPlaces < this.maxAmountOfPlaces[index]) {
            this.cardService.sumOfTrips--;
            this.cardService.priceOfTrips -= this.trips[index].price;
            this.trips[index].numberOfPlaces++;
            const toDel = this.basketService.basket.indexOf(this.trips[index]);
            // if (toDel > -1) {
                this.basketService.basket.splice(toDel, 1);
            // }
            this.fireBase.changeNumberOfPlaces(this.trips[index].id, this.trips[index].numberOfPlaces);
        }
      }

      getTripIndex(trip: Trip) {
        let index = 0;
        for (let item of this.trips) {
          if (item == trip) {
            return index;
          }
          index += 1;
        }
        return 0;
      }

      boughtTrip(trip: Trip) {
        this.maxAmountOfPlaces[this.getTripIndex(trip)]--;
        this.cardService.sumOfTrips--;
        this.cardService.priceOfTrips -= trip.price;
      }

      getTrip(index: number) {
        return this.trips[index];
      }

      nextId() {
        return this.trips.length - 1;
      }
}