import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyServiceService {

  constructor() { }

  currentCurrency: string = "USD" // "PLN" "EUR"
  currencyConverter: number = 1;

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
