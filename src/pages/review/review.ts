import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
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
  public charged_amt_currency;
  public charged_amt;
  public credited_amt;
  public credited_amt_currency;
  public principal_amt;
  public principal_amt_currency;

  public recipient_city;
  public recipient_country;
  public recipient_postal_code;

  pid;
  tref;

  amount;

  constructor(public navParams: NavParams, public alert:AlertController, public transactionServices:TransactionServices, public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController) {

  }

  ionViewDidEnter(){

    this.amount = this.navParams.get('amount');

    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Calculating Your Transaction Fee...",
    });

    loader.present();
    
    this.transactionServices.getTransactionQuote(this.amount)
    .subscribe(data => {

      console.log(data);
        
        this.charged_amt = data["charged_amt"]; // Total Transaction Fee
        this.charged_amt_currency = data.charged_amt_currency;
        this.credited_amt = data.credited_amt; // Amount received by the reciever
        this.credited_amt_currency = data.credited_amt_currency;
        this.principal_amt = data.principal_amt; // Amount to send to sender
        this.principal_amt_currency = data.principal_amt_currency

        this.tref = data.transaction_ref;
        this.pid = data.proposal_id;

        /*charged_amt:"107.81"
        charged_amt_currency:"USD"

        credited_amt:"80.00"
        credited_amt_currency:"GBP"
        expiration_id:"2018-07-18T21:14:29.578-05:00"
        fees_included:"false"
        fx_rate:"0.75956025000000"
        principal_amt:"105.32"
        principal_amt_currency:"USD"
        proposal_id:"1rm0rAPdiHZiIj3UAOEfRSqwA5E="
        transaction_id:"kvG7JEeoXjN_gSOksoxzKgZY"
        transaction_ref:"HlzsYUBvFvt5ZSFESXsklIOg"*/

      loader.dismiss();
  
    }, err => {
      this.presentError(err);
    })
    
    this.transactionServices.get('firstname')
      .then(
        res => { // Success
          console.log(res);
          this.recipient_name = res;
        },
        err => { // Error
          console.error(err);
        }
      );
  
    this.transactionServices.get("lastname")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_name = this.recipient_name + " " + res;
        },
        err => { // Error
          this.presentError(err);
        }
      );
    

    this.transactionServices.get("tel")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_tel = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );
    
      this.transactionServices.get("nationality")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_nationality = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );

      this.transactionServices.get("city")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_city = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );

      this.transactionServices.get("country")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_country = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );

      this.transactionServices.get("postal_code")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_postal_code = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );
  }

  getStorageSetting(name){
    this.transactionServices.get("tel")
      .then(
        res => { // Success
          return res;
        },
        err => { // Error
          this.presentError(err);
        }
      );

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

    this.navCtrl.push(ThankyouPage,{
      tref: this.tref,
      pid: this.pid,
      trans_amount: this.amount
    });

  }

  presentError(err){
    const alert = this.alert.create({
      title: 'An Error Occured !',
      subTitle: 'An error occured generating your transaction cost, please try again ' + err,
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('Cancel clicked');
        }
      }]
    });
    alert.present();
  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }
}
