// import { trips } from './Trips';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { first, map, max, Observable } from 'rxjs';
import { Trip } from './ITrip';

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  trips: Observable<any[]>;
  private nextId: number | undefined

  constructor(
    private dataBase: AngularFireDatabase
  ) {
    this.trips = this.dataBase.list('trips').valueChanges();
    this.dataBase.list('trips', ref => ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1});
   }

  getTrips(): Observable<any[]> {
    return this.trips
  }

  addTrip(trip: Trip) {
    this.dataBase.list('trips').push({
      id: trip.id,
      tripName: trip.tripName,
      country: trip.country,
      start: trip.start,
      end: trip.end,
      price: trip.price,
      numberOfPlaces: trip.numberOfPlaces,
      maxAmountOfPlaces: trip.maxAmountOfPlaces,
      description: trip.description,
      img: trip.img
    });
  }

  removeTrip(index: number) {
    console.log(index);
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().id == index) {
          console.log(i.payload.key)
          this.dataBase.list('trips').remove(i.payload.key)
        }
      }
    })
  }

  changeNumberOfPlaces(idx: number, places: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {numberOfPlaces: places})
        }
      }
    } )
  }

  changeMaxAmountOfPlaces(idx: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {maxAmountOfPlaces: i.payload.val().maxAmountOfPlaces - 1})
        }
      }
    } )
  }

  getNextIndex() {
    return this.nextId;
  }

}
