import { AuthService } from './../auth.service';
import { TripCardServiceService } from './../trip-card-service.service';
import { Review } from './../IReview';
import { reviews } from './../Reviews';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { BoughtTrip } from '../IBoughtTrip';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';
import { ReviewService } from '../review.service';

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent {

  modelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public cardService: TripCardServiceService,
    public auth: AuthService,
    public fireBase: DatabaseService,
    public reviewService: ReviewService
  ) { 
    this.modelForm = this.formBuilder.group({
      userNick: ['', Validators.required],
      opinion: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    })
   }
   
   boughtTrips: any[] = [];
   tripsSub: Subscription | undefined;
   historyId: number = -1;
   historyName: string = "";
 
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

  formErrors = {
    userNick: '',
    opinion: '',
    date: ''
  }

  canAddReview() {
    let userUid = this.auth.userData.uid;
    for (let boughtTrip of this.boughtTrips) {
      if (boughtTrip.uid == userUid && boughtTrip.tripId == this.reviewService.tripId && boughtTrip.opinion == "") {
        return true;
      }
    }
    return false;
  }

  canAddRate() {
    let userUid = this.auth.userData.uid;
    for (let boughtTrip of this.boughtTrips) {
      if (boughtTrip.uid == userUid && boughtTrip.tripId == this.reviewService.tripId && boughtTrip.rate == 0) {
        return true;
      }
    }
    return false;
  }

  onSubmit(modelForm: FormGroup) {
    let userUid = this.auth.userData.uid;
    for (let boughtTrip of this.boughtTrips) {
      if (boughtTrip.uid == userUid && boughtTrip.tripId == this.reviewService.tripId) {
        this.historyId = boughtTrip.id;
        this.historyName = boughtTrip.tripName;
        break;
      }
    }
    if (this.ifRate == false) {
      this.lastRate = -1;
    }
    for (let error in this.formErrors) {
      if (!this.modelForm.controls[error].valid) {
          alert('Wrong data in ' + error);
          return;
      }
    }
    // this.reviews.push({
    //   rate: this.lastRate + 1,
    //   userNick: modelForm.value['userNick'],
    //   tripName: modelForm.value['tripName'],
    //   opinion: modelForm.value['opinion'],
    //   date: modelForm.value['date']
    // });
    this.fireBase.changeOpinion(this.historyId, modelForm.value['opinion']);
    this.fireBase.changeUserNick(this.historyId, modelForm.value['userNick']);
    this.fireBase.changeDate(this.historyId, modelForm.value['date']);
    // this.cardService.sumtripRating += this.lastRate + 1;
    // this.cardService.ratingCount++;
    // this.cardService.rateAverage();
    this.showRate[this.lastRate] = false;
    this.lastRate = 0;
    this.ifRate = false;
    modelForm.reset();
  }

  showRate: boolean[] = [false, false, false, false, false];
    rating: number[] = [1, 2, 3, 4, 5];
    lastRate: number = 0;
    ifRate = false;
    colorRate: string[] = ['#D61C4E', '#FF4949', '#FF8D29', '#FEB139', '#FFC107'];

    rate(index: number) {
        this.ifRate = true;
        index = 4 - index; 
        this.showRate[this.lastRate] = false;
        this.showRate[index] = true;
        this.lastRate = index;
    }
  
    rateTrip(rate: number) {
      let userUid = this.auth.userData.uid;
      let tripId = -1;
      for (let boughtTrip of this.boughtTrips) {
        if (boughtTrip.uid == userUid && boughtTrip.tripId == this.reviewService.tripId) {
          this.historyId = boughtTrip.id;
          this.historyName = boughtTrip.tripName;
          tripId = boughtTrip.tripId;
          break;
        }
      }
      this.fireBase.changeRate(this.historyId, rate);
      this.fireBase.changeTripRate(tripId, rate);
      // this.currentAverage(this.historyName);
    }

    currentAverage(tripName: string) {
      let numOfRates = 0;
      let sumOfRates = 0;
      for (let trip of this.boughtTrips) {
        let name: string = trip.tripName;
        if (name == tripName && trip.rate != 0) {
          numOfRates++;
          sumOfRates += trip.rate;
        }
      }
      if (numOfRates == 0) {
        this.cardService.currentAverageCounter(0, tripName);
      }
      this.cardService.currentAverageCounter(Math.round(sumOfRates / numOfRates * 100) / 100, tripName);
    }
}
