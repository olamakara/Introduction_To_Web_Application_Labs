import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { Router } from '@angular/router';
import { first, firstValueFrom, Observable } from 'rxjs';
import { DatabaseService } from './database.service';
import { BasketServiceService } from './basket-service.service';
import { Roles, User } from './User';
import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    menager: false,
    client: false,
    banned: false,
  };

  persistenceSetting: string = 'local';

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private dataBase: DatabaseService,
    private basket: BasketServiceService
  ) { 
    afAuth.authState.subscribe(async (ev: any) => {
      if (ev) {
        this.userData = ev;
        const roles = await this.dataBase.getUserRoles(ev?.uid);
        this.userRoles = roles as Roles;
      } else {
        this.userData = null;
        this.userRoles = {
          guest: true,
          admin: false,
          menager: false,
          client: false,
          banned: false,
        };
      }
    });
   }

   signInEmailPass(email: string, password: string) {
    return this.afAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then((ev) => {
          // this.router.navigate(['offer']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  registerEmailPass(email: string, password: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        this.dataBase.addNewUser(userData);
        this.router.navigate(['offer']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  changePersistence(newSetting: string) {
    this.persistenceSetting = newSetting;
    // this.afAuth.setPersistence(newSetting)
  }

  getCurrentUserData() {
    return this.afAuth.currentUser;
  }

  getAuthenticated(): Observable<any> {
    return this.afAuth.authState;
  }

  signOut() {
    return this.afAuth.signOut().then((ev) => {
      this.basket.basket = []
      this.router.navigate(['']);
    });
  }

  isLoggedIn() {
    return this.userData != null;
  }
}
