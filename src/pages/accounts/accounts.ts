import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { AccountsactivityPage } from '../accountsactivity/accountsactivity';
import { InfoPage } from '../info/info';
import { AccountService } from '../../services/accountServices';
import { AssistantPage } from '../assistant/assistant';

@IonicPage({
  name: 'Accounts'
}) 

@Component({
  selector: 'page-accounts',
  templateUrl: 'accounts.html'
})
export class AccountsPage { 

  account_selected;

  public accountslists=null;

  constructor(public accountService:AccountService, public transactionServices: TransactionServices, public navCtrl: NavController, public modalCtrl: ModalController, public storage:Storage) {

  }

  ionViewDidLoad(){
    
    if(this.accountService.getAccounts().length == 0)
    {
      this.accountService.addNewAccount("House Savings",98000000,"...7402");
      this.accountService.addNewAccount("Online Chequing",8000,"...3833");
      this.accountService.addNewAccount("Business Savings",12000,"...8763");
      this.accountService.addNewAccount("College Savings",1000,"...4509");
      this.accountService.addNewAccount("Student Chequing",300,"...7184");
    }
    this.accountslists = this.accountService.getAccounts();
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
      /*this.navCtrl.push(AccountsactivityPage,{
        account:account
      });*/
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
    //this.navCtrl.push(ProfilePage);
  }

  // Go to the step 1 - Select Recipient Page
  viewAccountHistory(i) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(AccountsactivityPage,{
      index:i
    });
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
