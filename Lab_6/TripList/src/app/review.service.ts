import { Trip } from './ITrip';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor() { }

  tripId: number = -1;

  setCurrentTrip(id: number) {
    this.tripId = id;
  }
}
