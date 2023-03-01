import { Component, OnInit } from '@angular/core';

interface Model {
  model: string;
  colors: string[];
}

interface Car {
  brand: string;
  models: Model[];
}


@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})


export class CarComponent implements OnInit {

  constructor() { }

  currentModels: Model[] = [];
  currentColors: string[] = [];

  chosenBrand = ''
  chosenModel = ''
  chosenColor = ''

  carData: any

  ngOnInit(): void {
    fetch('./assets/car/carss.json').then(res => res.json())
    .then(json => {
      this.carData = json
    });
  }

  changeBrand() {
    this.chosenColor=''
    this.chosenModel=''
  }
  changeModel() {
    this.chosenColor=''
    this.currentColors = this.carData[this.chosenBrand][this.chosenModel];
  }
}