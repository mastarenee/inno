import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { AccountsPage } from '../accounts/accounts';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThankyouPage');
  }

  goToHome(){
    this.navCtrl.push(AccountsPage);
  }

  viewTransactionDetails(){
    this.navCtrl.push(TransactionHistoryDetailPage);
  }

}
