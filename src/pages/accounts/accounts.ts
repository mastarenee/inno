import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  public accountslists = [
    {
        alias: 'House Savings',
        amount: '98000',
        account:'3986357402',
    },
    {
        alias: 'Investment Savings',
        amount: '8000',
        account:'3298743833',
    },
    {
        alias: 'Business Savings',
        amount: '12000',
        account:'0972348763',
    }
  ]

  constructor(public navCtrl: NavController) {

  }

  // Go to the step 1 - Select Recipient Page
  selectAccount(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

}
