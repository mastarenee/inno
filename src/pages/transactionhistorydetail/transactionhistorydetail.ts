import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-transactionhistorydetail',
  templateUrl: 'transactionhistorydetail.html'
})
export class TransactionHistoryDetailPage {

  transactionNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.transactionNumber = navParams.get('item');
  }

}
