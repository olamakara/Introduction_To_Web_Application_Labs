import { TripCardServiceService } from './../trip-card-service.service';
import { Trip } from './../ITrip';
import { DatabaseService } from './../database.service';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent {

    modelForm: FormGroup;
    @Output() newTrip = new EventEmitter<number>()

    constructor(
        private formBuilder : FormBuilder,
        private fireBase: DatabaseService,
        private cardService: TripCardServiceService
        ) {
        this.modelForm = this.formBuilder.group({
            tripName: ['', [Validators.required]],
            country: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]*')]],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]],
            price: ['', [Validators.required]],
            numberOfPlaces: ['', [Validators.required]],
            // maxAmountOfPlaces: ['', [Validators.required]],
            description: ['', [Validators.required]],
            img: [[], [Validators.required]]
        })
    }

    formErrors = {
        tripName: '',
        country: '',
        start: '',
        end: '',
        price: '',
        numberOfPlaces: '',
        // maxAmountOfPlaces: '',
        description: '',
        img: ''
    }

    onSubmit(modelForm: FormGroup): void {
        for (let error in this.formErrors) {
            if (!modelForm.controls[error].valid) {
                alert('Wrong data in ' + error);
                return;
            }
        }
        let newTrip = {
            id: this.fireBase.getNextIndex(),
            rate: 0,
            numberOfRates: 0,
            tripName: modelForm.value['tripName'],
            country: modelForm.value['country'],
            start: modelForm.value['start'],
            end: modelForm.value['end'],
            price: modelForm.value['price'],
            numberOfPlaces: modelForm.value['numberOfPlaces'],
            // maxAmountOfPlaces: modelForm.value['maxAmountOfPlaces'],
            maxAmountOfPlaces: modelForm.value['numberOfPlaces'],
            description: modelForm.value['description'],
            img: this.getImages(modelForm.value['img'])
        } as Trip;
        // this.newTrip.emit(modelForm.value['numberOfPlaces']);
        this.cardService.maxAmountOfPlaces.push(newTrip.maxAmountOfPlaces);
        this.fireBase.addTrip(newTrip);
        modelForm.reset();  
    }

    getImages(string: string) {
        return string.split(" ");
    }

}