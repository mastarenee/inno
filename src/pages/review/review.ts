import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { ThankyouPage } from '../thankyou/thankyou';
import { AccountsPage } from '../accounts/accounts';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  public transaction_fee;
  public total_transaction_fee;
  public transaction_total;
  public recipient_name;
  public recipient_address;
  public recipient_nationality;
  public recipient_tel;
  public account_transfer_from;

  constructor(public transactionServices:TransactionServices, public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController) {

  }

  ionViewDidEnter(){

    this.recipient_name = this.transactionServices.get('firstname') + ' ' + this.transactionServices.get('lastname'); 
    this.recipient_tel = this.transactionServices.get('tel');
    this.recipient_nationality = this.transactionServices.get('nationality');

  }

  ionViewDidLoad() {
    
  }

  selectAccount(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  transactionText:string = "Connecting to Master Card Send...";

  goToThankYou(){

    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: this.transactionText,
      duration: 4000
    });


    setTimeout(() => {
      this.transactionText = "Processing Your Information";
    }, 1000);

    // Show Loading Action
    setTimeout(() => {
      this.navCtrl.push(ThankyouPage);
    }, 4010);

  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }
}
