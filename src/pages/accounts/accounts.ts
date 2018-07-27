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

    if(this.accountService.getAccountsTransaction().length == 0)
    {
      this.accountService.addNewAccountTransaction('House Savings','John','Doe', '#13 Warrens House', 'London', 'United Kingdom', '2018-07-21T13:14:40-05:00',
      '50.00', 'GBR', '0123653935',  '', '', 'completed', 1290723678623, '435ubsd79a9das877','GBP');

      this.accountService.addNewAccountTransaction('Online Chequing','Fredrick','Smith', '#15 Warrens House', 'Texas', 'Canada', '2018-07-22T13:14:40-05:00',
      '30.00', 'CAD', '1290723678623',  '', '', 'completed', 1290723678623, '32497sdfj2b7987','CAD');

      this.accountService.addNewAccountTransaction('Business Savings','Fredrick','Smith', '#13 Warrens House', 'Texas', 'Canada', '2018-07-21T13:14:40-05:00',
      '50.00', 'CAD', '0123653935',  '', '', 'pending', 1290723678623, '345lnmnjao40fdgdfg','CAD');

      this.accountService.addNewAccountTransaction('House Savings','John','Doe', '#13 Warrens House', 'Texas', 'Canada', '2018-07-21T13:14:40-05:00',
      '350.00', 'CAD', '0123653935',  '', '', 'pending', 1290723678623, '435ubsd79a9das877','CAD');

      this.accountService.addNewAccountTransaction('College Savings','John','Doe', '#13 Warrens House', 'London', 'United Kingdom', '2018-07-21T13:14:40-05:00',
      '50.00', 'GBR', '0123653935',  '', '', 'rejected', 1290723678623, '4dfdsfdgfdfdgdf377','GBP');
    }
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
