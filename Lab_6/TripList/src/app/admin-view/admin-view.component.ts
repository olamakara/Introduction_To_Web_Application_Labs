import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { User, Roles } from '../User';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';
import { BasketServiceService } from '../basket-service.service';
import { Subscription } from 'rxjs';
import { DatabaseService } from './../database.service';

@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})

export class AdminViewComponent implements OnInit {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService,
    public basketService: BasketServiceService,
    private dataBase: DatabaseService,
    public auth: AuthService
  ) { }

  users: User[] = [];
  usersSub: Subscription | undefined;
  selectedPersistence = this.auth.persistenceSetting;
  displayRoles: boolean[] = [];
  // choice = ["LOCAL", "SESSION", "NONE"];

  ngOnInit() {
    console.log(this.auth?.userData);
    this.usersSub = this.dataBase.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let userToAdd = new User(user.payload.val());
        console.log(user.payload.val());
        userToAdd.uid = user.payload.key || 'undefined';
        this.users.push(userToAdd);
        this.displayRoles.push(false);
      }
    });
  }

  ngOnDestroy() {
    this.usersSub?.unsubscribe();
  }

  ifDisplayRoles(index: number) {
    if (this.displayRoles[index]) {
      this.displayRoles[index] = false;
    } else {
      this.displayRoles[index] = true; 
    }
  }

  giveBan(uid: string) {
    this.dataBase.changeUserRole(uid, 'banned', 'true');
  }

  removeBan(uid: string) {
    this.dataBase.changeUserRole(uid, 'banned', 'false');
  }

  changeAdmin(uid: string, bool: string) {
    this.dataBase.changeUserRole(uid, 'admin', bool);
  }

  changeMenager(uid: string, bool: string) {
    this.dataBase.changeUserRole(uid, 'menager', bool);
  }

  changeClient(uid: string, bool: string) {
    this.dataBase.changeUserRole(uid, 'client', bool);
  }

  // chosenPersistence() {
  //   console.log(this.selectedPersistence);
  //   this.auth.changePersistence(this.selectedPersistence);
  // }
}
