export interface Trip {
    id: number,
    rate: number,
    numberOfRates: number,
    tripName: string;
    country: string;
    start: string;
    end: string;
    price: number;
    numberOfPlaces: number;
    maxAmountOfPlaces: number;
    description: string;
    img: string[];
}