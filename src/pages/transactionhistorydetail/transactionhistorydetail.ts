import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-transactionhistorydetail',
  templateUrl: 'transactionhistorydetail.html'
})
export class TransactionHistoryDetailPage {

  public transactionNumber;
  public amount = 80;
  public account_transfer_from = "House Savings";
  public recipient_name = "John Doe";
  public recipient_address = "#13 Warrens Great House";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.transactionNumber = navParams.get('item');
  }

}
