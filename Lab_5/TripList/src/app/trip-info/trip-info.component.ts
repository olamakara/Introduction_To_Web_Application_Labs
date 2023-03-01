import { BasketServiceService } from './../basket-service.service';
import { DatabaseService } from './../database.service';
import { MainPageComponent } from './../main-page/main-page.component';
import { TripCardServiceService } from './../trip-card-service.service';
import { CurrencyServiceService } from './../currency-service.service';
// import { trips } from './../Trips';
import { Trip } from '../ITrip';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';

@Component({
  selector: 'app-trip-info',
  templateUrl: './trip-info.component.html',
  styleUrls: ['./trip-info.component.css']
})

export class TripInfoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    private fireBase: DatabaseService,
    private basketService: BasketServiceService
  ) { }

  subscription: Subscription | undefined
  slideIndex = 0;

  id: number = -1
  trip: Trip[] = []
  selected: number = 0
  tripMaxAmountOfPlaces: any[] = [];

  ngOnInit(): void {
    this.subscription = this.route.params.subscribe(params => {
      this.id = params['id']
      this.fireBase.getTrips().pipe(first()).subscribe((trips: any[]) => {
        let trip: any
        for (let d of trips) {
            if (d.id == this.id) {
              trip = d
              break
            }
        }
        console.log(trip)
        console.log(this.id)
        this.trip.push({
          id: trip.id,
          tripName: trip.tripName,
          country: trip.country,
          start: trip.start,
          end: trip.end,
          price: trip.price,
          description: trip.description,
          numberOfPlaces: trip.numberOfPlaces,
          maxAmountOfPlaces: trip.maxAmountOfPlaces,
          img: trip.img} as Trip)
        this.tripMaxAmountOfPlaces.push(trip.maxAmountOfPlaces);
      })
    })
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe()
  }
 
    increaseSlideIndex() {
      this.slideIndex = (this.slideIndex + 1) % 2;
    }

    nextSlide() {
      this.slideIndex = (this.slideIndex + 1) % this.trip[0].img.length;
    }

    previousSlide() {
      let change = this.trip[0].img.length;
      this.slideIndex = (this.slideIndex + change - 1) % change;
    }

    addTrip(trip: Trip) {
      if (trip.numberOfPlaces > 0) {
          this.cardService.sumOfTrips++;
          this.cardService.priceOfTrips += trip.price;
          trip.numberOfPlaces--;
          this.basketService.basket.push(trip);
          this.fireBase.changeNumberOfPlaces(trip.id, trip.numberOfPlaces);
      }
    }

    removeTrip(trip: Trip) {
      if (trip.numberOfPlaces < this.tripMaxAmountOfPlaces[0]) {
          this.cardService.sumOfTrips--;
          this.cardService.priceOfTrips -= trip.price;
          trip.numberOfPlaces++;
          const toDel = this.basketService.basket.indexOf(trip);
          // if (toDel > -1) {
              this.basketService.basket.splice(toDel, 1);
          // }
          this.fireBase.changeNumberOfPlaces(trip.id, trip.numberOfPlaces);
      }
    }
}


