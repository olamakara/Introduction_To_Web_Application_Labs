import { Component } from '@angular/core';
import { trips } from './../Trips';

@Component({
    selector: 'app-main-page',
    templateUrl: './main-page.component.html',
    styleUrls: ['./main-page.component.css']
  })

export class MainPageComponent {
    
    constructor() { }

    trips = trips
    sumOfTrips: number = 0;
    maxAmountOfPlaces: number[] = trips.map(Trip => Trip.numberOfPlaces);
    Types = new Array();
    currentCurrency: string = "USD" // "PLN" "EUR"
    currencyConverter: number = 1;

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
        return this.sumOfTrips >= 10;
    }
    
    addTrip(index: number) {
        if (trips[index].numberOfPlaces > 0) {
            this.sumOfTrips++;
            trips[index].numberOfPlaces--;
        }
    }

    removeTrip(index: number) {
        if (trips[index].numberOfPlaces < this.maxAmountOfPlaces[index]) {
            this.sumOfTrips--;
            trips[index].numberOfPlaces++;
        }
    }

    ifNoPlaces(index: number) {
        return trips[index].numberOfPlaces == 0;
    }

    deleteTrip(index: number) {
        for (let i = 0; i <= this.maxAmountOfPlaces[index]; i++) {
            this.removeTrip(index);
        }
        if (index > -1) {
            trips.splice(index, 1);
            this.maxAmountOfPlaces.splice(index, 1);
        }
    }

    addCard($event: number) {
        this.maxAmountOfPlaces.push($event);
    }

    setDollar() {
        this.currencyConverter = 1;
        this.currentCurrency = "USD";
    }

    setEuro() {
        this.currencyConverter = 0.95;
        this.currentCurrency = "EUR";
    }

    setZloty() {
        this.currencyConverter = 4.43;
        this.currentCurrency = "PLN";
    }
}