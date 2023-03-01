import { Component } from '@angular/core';

@Component({
    selector: 'star-rate',
    templateUrl: './star.component.html',
    styleUrls: ['./star.component.css']
})

export class StarComponent {

    constructor() { }
    
    showRate: boolean[] = [false, false, false, false, false];
    rating: number[] = [1, 2, 3, 4, 5];
    lastRate: number = 0;
    colorRate: string[] = ['#D61C4E', '#FF4949', '#FF8D29', '#FEB139', '#FFC107'];

    rate(index: number) {
        index = 4 - index; 
        this.showRate[this.lastRate] = false;
        this.showRate[index] = true;
        this.lastRate = index;
    }
}