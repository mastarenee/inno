import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccountsactivityPage } from '../accountsactivity/accountsactivity';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  account_selected;


  public accountslists = [
    {
        alias: 'House Savings',
        amount: '98,000',
        account: '7402',
    },
    {
        alias: 'Online Chequing',
        amount: '8,000',
        account:'3833',
    },
    {
        alias: 'Business Savings',
        amount: '12,000',
        account:'8763',
    },
    {
      alias: 'College Savings',
      amount: '1,000',
      account:'8763',
  },
    {
      alias: 'Student Chequing',
      amount: '300',
      account:'7184',
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
    this.navCtrl.push(TransactionHistoryPage);
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
