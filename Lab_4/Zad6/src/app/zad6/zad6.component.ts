import { Component } from '@angular/core';
import { cards } from '../Cards'

@Component({
    selector: 'app-zad6',
    templateUrl: './zad6.component.html',
    styleUrls: ['./zad6.component.css']
})

export class zad6Component {

    constructor() { }

    cards = cards
    IfShowTopic: number[] = [0, 0, 0]
    lastTopicNumber: number = 0;

    learnMore(index: number) {
        this.IfShowTopic[this.lastTopicNumber] = 0
        this.IfShowTopic[index] = 1
        this.lastTopicNumber = index
    }
}