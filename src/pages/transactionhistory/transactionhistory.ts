import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, LoadingController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../filter/filter';
import { TransactionServices } from '../../services/transaction.services';
import { AccountService } from '../../services/accountServices';

@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {

  public refernce_id;
  public transaction_date;
  public transaction_status;
  public transaction_amount;

  //modalCtrl: any;
  //viewCtrl: any;
  
  public transactionLists = [];
  public user_account_information = [];

  public start_date;
  public end_date;
  public type;
  public showOverlay = false;
  public totalAmount = 5000;

  constructor(public accountService:AccountService, public navParams: NavParams, public transactionServices:TransactionServices, public loaderCtrl: LoadingController, public navCtrl: NavController, public modalCtrl: ModalController) {
    this.transactionLists = this.accountService.getAccounts();
    this.transactionLists = this.accountService.getAccountsTransaction();
  }

  getBalance(amount){
    return this.totalAmount - amount;
  }

  ionViewDidLoad() {}

  openTransactionT(event, account, firstname, lastname, streetaddress, city, country, date, amount, bank_country, iban, ban, bic, status, process_id, currency, transaction_ref){

    // Open the Transaction Detail Page
    this.navCtrl.push(TransactionHistoryDetailPage, {
      account: account,
      firstname: firstname,
      lastname: lastname,
      streetaddress: streetaddress,
      city: city,
      country: country,
      date: date,
      amount: amount,
      bank_country: bank_country,
      iban: iban,
      ban: ban,
      bic: bic,
      status: status,
      process_id: process_id,
      currency: currency,
      transaction_ref: transaction_ref
    });

  }

  openTransaction(event, account, firstname, lastname, streetaddress, city, country, date, amount, bank_country, iban, ban, bic, status,transaction_ref, process_id, currency) {
  
    // Open the Transaction Detail Page
    this.navCtrl.push(TransactionHistoryDetailPage, {
      account: account,
      firstname: firstname,
      lastname: lastname,
      streetaddress: streetaddress,
      city: city,
      country: country,
      date: date,
      amount: amount,
      bank_country: bank_country,
      iban: iban,
      ban: ban,
      bic: bic,
      status: status,
      process_id: process_id,
      currency: currency,
      transaction_ref: transaction_ref
    });
    
  }

  delete(chip: Element, option) {
    chip.remove();
    if( option == 'type'){
      this.type = '';
    }
  }

  openModal() {
    let profileModal = this.modalCtrl.create(FilterPage);
    profileModal.present();
    this.showOverlay = true;

    profileModal.onDidDismiss(data => {
      
      this.showOverlay = false;

      const loader = this.loaderCtrl.create({
        spinner: 'ios',
        content: "Apply Filters ...",
        duration: 1000
      });

      loader.present();
      
      this.type = data.type;
      this.start_date = data.start_date;
      this.end_date = data.end_date;

      console.log(data);
    });
    
  }

  checkFilter(status){

    if(this.type){
      if(this.type == status){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }

  }
  
}
