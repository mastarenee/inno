import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AccountsactivityPage } from '../accountsactivity/accountsactivity';
import { ProfilePage } from '../profile/profile';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { AssistantPage } from '../assistant/assistant';
import { TransactionServices } from '../../services/transaction.services';

@IonicPage({
  name: 'Accounts'
})

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage {

  account_selected;

  public accountslists = [];


  constructor(public transactionServices: TransactionServices, public navCtrl: NavController, public modalCtrl: ModalController, public storage:Storage) {

    this.transactionServices.get("user_accounts_lists")
    .then(
      res => { // Success
        console.log(res);
        this.accountslists = res; 
      }
    );

  }


  selectAccount(event, accountsType){

    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  swipe(event, account, account_number){
    console.log(event);

    //Right
    if(event.direction == 2){
      this.navCtrl.push(AccountsactivityPage,{
        account:account
      });
    }else{
      this.navCtrl.push(InfoPage,{
        account:account,
        accountID:account_number
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

  openChatbot(){
    //Chatbot that you can type and talk to
    this.navCtrl.push(AssistantPage);
  }

}
