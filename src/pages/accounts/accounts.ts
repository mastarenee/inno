import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccountsactivityPage } from '../accountsactivity/accountsactivity';
import { ProfilePage } from '../profile/profile';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';

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
        amount: '98,000,000',
        account: '...7402',
    },
    {
        alias: 'Online Chequing',
        amount: '8,000',
        account:'...3833',
    },
    {
        alias: 'Business Savings',
        amount: '12,000',
        account:'...8763',
    },
    {
      alias: 'College Savings',
      amount: '1,000',
      account:'...4509',
  },
    {
      alias: 'Student Chequing',
      amount: '300',
      account:'...7184',
  }
  ]


  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public storage:Storage) {

  }


  selectAccount(event, accountsType){

    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  swipe(event, account){
    console.log(event);

    //Right
    if(event.direction == 2){
      this.navCtrl.push(TransactionHistoryPage,{
        account:account
      });
    }else{
      this.navCtrl.push(InfoPage,{
        account:account
      });
    }
  }

  showTransactionHistory(event){
    this.navCtrl.push(TransactionHistoryPage);
  }

  startWireTransaction(){
    this.navCtrl.push(InfoPage);
  }

  openProfile(){
    this.navCtrl.push(ProfilePage);
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
