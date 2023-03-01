import { Component } from '@angular/core';
import { CurrencyServiceService } from '../currency-service.service';
import { TripCardServiceService } from '../trip-card-service.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent {

  constructor(
    public currencyConverter: CurrencyServiceService,
    public cardService: TripCardServiceService
  ) { }

}
