import { reviews } from './Reviews';
import { BoughtTrip } from './IBoughtTrip';
// import { trips } from './Trips';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { first, firstValueFrom, map, max, Observable } from 'rxjs';
import { Trip } from './ITrip';
import { User, Roles } from './User';
import { isEqual } from "lodash"

@Injectable({
  providedIn: 'root'
})

export class DatabaseService {

  trips: Observable<any[]>;
  history: Observable<any[]>;
  private nextId: number | undefined
  private nextHistoryId: number | undefined

  constructor(
    private dataBase: AngularFireDatabase
  ) {
    this.trips = this.dataBase.list('trips').valueChanges();
    this.dataBase.list('trips', ref => ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextId = res[0]?.id+1});
    this.history = this.dataBase.list('history').valueChanges();
    this.dataBase.list('history', ref => ref.orderByChild('id').limitToLast(1)).valueChanges().subscribe((res: any[]) => {this.nextHistoryId = res[0]?.id+1});

  }

  getTrips(): Observable<any[]> {
    return this.trips
  }

  addTrip(trip: Trip) {
    this.dataBase.list('trips').push({
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

  updateMaxAmountOfPlaces(idx: number, places: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {maxAmountOfPlaces: places})
        }
      }
    } )
  }

  changeTripName(idx: number, newTripName: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {tripName: newTripName})
        }
      }
    } )
  }

  changeCountry(idx: number, newCountry: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {country: newCountry})
        }
      }
    } )
  }

  changeStartDate(idx: number, newStartDate: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {start: newStartDate})
        }
      }
    } )
  }

  changeEndDate(idx: number, newEndDate: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {end: newEndDate})
        }
      }
    } )
  }

  changePrice(idx: number, newPrice: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {price: newPrice})
        }
      }
    } )
  }

  changeDescription(idx: number, newDescription: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == idx)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {description: newDescription})
        }
      }
    } )
  }

  deleteImageAtIndex(tripId: number, imgIdx: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == tripId)
        {
          console.log(i.payload.key)
          let newImagesArray = i.payload.val().img
          newImagesArray.splice(imgIdx, 1)
          this.dataBase.list('trips').update(i.payload.key, {img: newImagesArray})
        }
      }
    } )
  }

  addImage(tripId: number, newImage: string) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == tripId)
        {
          console.log(i.payload.key)
          let newImagesArray = i.payload.val().img
          newImagesArray.push(newImage)
          this.dataBase.list('trips').update(i.payload.key, {img: newImagesArray})
        }
      }
    } )
  }

  getNextIndex() {
    return this.nextId;
  }

  async getUserRoles(uid: string) {
    return firstValueFrom(
      this.dataBase.object('/users/' + uid + '/roles').valueChanges()
    );
  }

  addNewUser(user: User) {
    this.dataBase.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
      uid: user.uid,
      history: user.history,
      numberOfBoughtTrips: user.numberOfBoughtTrips,
      comments: user.comments,
      rates: user.rates
    });
  }

  getUsers() {
    return this.dataBase.list('users').snapshotChanges();
  }

  changeUserRole(uid: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.dataBase.object('/users/' + uid + '/roles').update(JSON.parse(change));
  }

  addTripToHistory(boughtTrip: BoughtTrip) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(isEqual(i, boughtTrip)) {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {places: i.payload.val().places + 1})
          return;
        }
      }
    } )
    this.dataBase.list('history').push({
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
    });
  }

  addPlaceToHistoryTrip(historyId: number) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == historyId)
        {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {places: i.payload.val().places + 1})
        }
      }
    } )
  }

  getHistoryTrips() {
    return this.history;
  }

  getNextHistoryIndex() {
    return this.nextHistoryId;
  }

  changeOpinion(historyId: number, newOpinion: string) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == historyId)
        {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {opinion: newOpinion})
        }
      }
    } )
  }

  changeUserNick(historyId: number, newNick: string) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == historyId)
        {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {userNick: newNick})
        }
      }
    } )
  }

  changeDate(historyId: number, newDate: string) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == historyId)
        {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {date: newDate})
        }
      }
    } )
  }

  changeRate(historyId: number, newRate: number) {
    this.dataBase.list('history').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == historyId)
        {
          console.log(i.payload.key)
          this.dataBase.list('history').update(i.payload.key, {rate: newRate})
        }
      }
    } )
  }

  changeTripRate(tripId: number, rate: number) {
    this.dataBase.list('trips').snapshotChanges().pipe(first()).subscribe((items:any) => {
      for(let i of items) {
        if(i.payload.val().id == tripId)
        {
          console.log(i.payload.key)
          this.dataBase.list('trips').update(i.payload.key, {rate: i.payload.val().rate + rate})
          this.dataBase.list('trips').update(i.payload.key, {numberOfRates: i.payload.val().numberOfRates + 1})
        }
      }
    } )
  }
}
