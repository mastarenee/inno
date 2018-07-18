import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccountsactivityPage } from '../accountsactivity/accountsactivity';

@IonicPage({
  name: 'Accounts'
})

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  account_selected;


  public accountslists = [
    {
        alias: 'House Savings',
        amount: '98000',
        account: '7402',
    },
    {
        alias: 'Investment Savings',
        amount: '8000',
        account:'3833',
    },
    {
        alias: 'Business Savings',
        amount: '12000',
        account:'8763',
    }
  ]


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage:Storage) {

  }

  selectAccount(event, accountsType){

    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  showTransactionHistory(event){
    this.navCtrl.push(InfoPage, {
      item: TransactionHistoryPage 
    });
  }

  startWireTransaction(){
    this.navCtrl.push(InfoPage);
  }

  // Go to the step 1 - Select Recipient Page
  viewAccountHistory() {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AccountsactivityPage);
  }

  optionSelected(event){
    console.log(event);
    this.navCtrl.push(InfoPage);
  }

}
