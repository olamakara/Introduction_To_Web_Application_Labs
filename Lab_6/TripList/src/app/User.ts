import { Trip } from "./ITrip";

export interface Roles {
    guest: boolean;
    client: boolean;
    menager: boolean;
    admin: boolean;
    banned: boolean;
  }

export class User {
  email: string;
  roles: Roles;
  uid: string;
  // basket: Trip[] = [];
  history: any[] = [0];
  numberOfBoughtTrips: any[] = [0];
  comments: any[] = [0];
  rates: any[] = [0];

  constructor(userData: any) {
    this.email = userData.email;
    this.uid = userData.uid;
    if (userData.roles != null) {
      this.roles = userData.roles;
    } else
      this.roles = {
        client: true,
        guest: true,
        menager: false,
        admin: false,
        banned: false,
      };
  }
}