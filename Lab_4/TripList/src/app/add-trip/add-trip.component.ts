import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { trips } from './../Trips';

@Component({
    selector: 'app-add-trip',
    templateUrl: './add-trip.component.html',
    styleUrls: ['./add-trip.component.css']
})

export class AddTripComponent {

    trips = trips
    modelForm: FormGroup;
    @Output() newTrip = new EventEmitter<number>()

    constructor(private formBuilder : FormBuilder) {
        this.modelForm = this.formBuilder.group({
            tripName: ['', [Validators.required]],
            country: ['', [Validators.required, Validators.minLength(4), Validators.pattern('[a-zA-Z]*')]],
            start: ['', [Validators.required]],
            end: ['', [Validators.required]],
            price: ['', [Validators.required]],
            numberOfPlaces: ['', [Validators.required]],
            description: ['', [Validators.required]],
            img: ['', [Validators.required]]
        })
    }

    formErrors = {
        tripName: '',
        country: '',
        start: '',
        end: '',
        price: '',
        numberOfPlaces: '',
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
        this.trips.push({
            tripName: modelForm.value['tripName'],
            country: modelForm.value['country'],
            start: modelForm.value['start'],
            end: modelForm.value['end'],
            price: modelForm.value['price'],
            numberOfPlaces: modelForm.value['numberOfPlaces'],
            description: modelForm.value['description'],
            img: modelForm.value['img']
        });
        this.newTrip.emit(modelForm.value['numberOfPlaces'])
        modelForm.reset();  
    }

}