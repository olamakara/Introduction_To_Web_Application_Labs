import { Trip } from "./ITrip";

export interface BoughtTrip {
    id: number;
    uid: string;  // user.uid
    rate: number;
    tripId: number;
    tripName: string;
    country: string;
    start: string;
    end: string;
    price: number;
    places: number;
    userNick: string,
    opinion: string,
    date: string
}