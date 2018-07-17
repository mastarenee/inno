import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { ThankyouPage } from '../thankyou/thankyou';
import { AccountsPage } from '../accounts/accounts';
import { Storage } from '@ionic/storage';

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
  public account_transfer_from;

  constructor(public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController) {

  }

  ionViewDidEnter(){

    // Transaction Information
    this.storage.get('transaction_information').then((val) => {
      if(val){
        console.log(val);
      }
    });

    // Transaction Address
    this.storage.get('transaction_address').then((val) => {
      if(val){
        console.log(val);
      }
    });

    // Transaction Transfer
    this.storage.get('transaction_details').then((val) => {
      if(val){
        console.log(val);
      }
    });

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
