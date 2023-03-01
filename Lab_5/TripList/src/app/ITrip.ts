export interface Trip {
    id: number,
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