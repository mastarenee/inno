import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';

@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {

  constructor(public navCtrl: NavController) {

  }

  openTransaction(event, accountNumber) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(TransactionHistoryDetailPage, {
      item: accountNumber 
    });
  }

}
