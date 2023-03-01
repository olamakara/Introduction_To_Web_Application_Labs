import { TripCardServiceService } from './../trip-card-service.service';
import { Review } from './../IReview';
import { reviews } from './../Reviews';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html',
  styleUrls: ['./review-form.component.css']
})

export class ReviewFormComponent {

  reviews = reviews;
  modelForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public cardService: TripCardServiceService
  ) { 
    this.modelForm = this.formBuilder.group({
      userNick: ['', Validators.required],
      tripName: ['', Validators.required],
      opinion: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: ['']
    })
   } 

  formErrors = {
    userNick: '',
    tripName: '',
    opinion: '',
    date: ''
  }

  addReview(review: Review) {
    const newReview: Review = {
      rate: this.lastRate,
      userNick: review.userNick,
      tripName: review.tripName,
      opinion: review.opinion,
      date: review.date
    };
    this.reviews.push(newReview);
  }

  onSubmit(modelForm: FormGroup) {
    if (this.ifRate == false) {
      this.lastRate = -1;
    }
    for (let error in this.formErrors) {
      if (!this.modelForm.controls[error].valid) {
          alert('Wrong data in ' + error);
          return;
      }
    }
    this.reviews.push({
      rate: this.lastRate + 1,
      userNick: modelForm.value['userNick'],
      tripName: modelForm.value['tripName'],
      opinion: modelForm.value['opinion'],
      date: modelForm.value['date']
    });
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
}
