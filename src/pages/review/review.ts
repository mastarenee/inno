import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { ThankyouPage } from '../thankyou/thankyou';
import { AccountsPage } from '../accounts/accounts';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services';

import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  @ViewChild(Navbar) navBar: Navbar;

  public transaction_fee;
  public total_transaction_fee;
  public transaction_total;
  public dob;
  public recipient_name;
  public recipientname;
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
  public bank_country;
  public bank_code;
  public iban;
  public error_occured = false;

  public pid;
  public tref;
  public transactionID;

  public amount;
  public fx_expiration;

  constructor(public navParams: NavParams, public alert:AlertController, public transactionServices:TransactionServices, public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController) {

  }

  ionViewDidLoad() {

    this.recipient_name = this.navParams.get('firstname') + ' ' + this.navParams.get('lastname');
    this.recipient_address = this.navParams.get('streetAddress');

    this.account_transfer_from = this.navParams.get('account');
    this.amount = this.navParams.get('amount');
    this.iban = "iban:" + this.navParams.get('iban');
    this.bank_country = this.navParams.get('bank_country');

    this.navBar.backButtonClick = (e:UIEvent)=>{
     // todo something
     this.cancelPage();
    }
  }

  editAmount(){

  }

  editAccount(){

  }

  editContact(){

  }

  editAddress(){

  }

  tryAgain(){
    this.ionViewDidEnter();
  }

  ionViewDidEnter(){

    //this.amount = this.navParams.get('amount');

    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Calculating Your Transaction Fee...",
    });

    loader.present();

    let firstname = this.navParams.get('firstname');
    let lastname = this.navParams.get('lastname');
    let tel = this.navParams.get('tel');
    let nationality = this.navParams.get('nationality');
    let dob = this.navParams.get('dob');
    let streetAddress = this.navParams.get('streetAddress');
    let country = this.navParams.get('country');
    let postalCode = this.navParams.get('postalCode');
    let city = this.navParams.get('city');
    let amount = this.navParams.get('amount');
    let account = this.navParams.get('account');
    let bic = this.navParams.get('bic');
    let ban = this.navParams.get('ban');
    let iban = this.navParams.get('iban');

    let bank_code="0123653935";
    let receiverUri = "iban:"+iban;

    let cur = "CAD";
    if(nationality =="GBR")
    {
      cur = "GBP";
    }

    if (cur == "CAD")
    {
      bank_code = "000400012";
      receiverUri = "ban:"+ban+";bic="+bic;
    } 
   
    
    this.transactionServices.getTransactionQuote(cur, amount, receiverUri, country, bic,bank_code)
    .subscribe(data => {

      console.log(data);
        
      this.charged_amt = data.charged_amt; // Total Transaction Fee
      this.charged_amt_currency = data.charged_cur;
      this.credited_amt = data.credited_amt; // Amount received by the reciever
      this.credited_amt_currency = data.credited_cur;
      this.principal_amt = data.principal_amt; // Amount to send to sender
      this.principal_amt_currency = data.principal_cur;

      this.tref = data.transaction_ref;
      this.pid = data.prop_id;
      this.transactionID = data.transaction_id;
      //this.fx_expiration;
        
      loader.dismiss();
      this.error_occured = false;
  
    }, err => {
      loader.dismiss();
      this.error_occured = true;
      this.presentError(err);
    })

    this.recipient_tel = this.navParams.get('tel');
    this.recipient_nationality = this.navParams.get('nationality');
    this.dob = this.navParams.get('dob');
    this.recipient_country = this.navParams.get('country');
    this.recipient_postal_code = this.navParams.get('postalCode');
    this.recipient_city = this.navParams.get('city');
    this.bank_country = this.navParams.get('bank_country');
  }


  transactionText:string = "Connecting to Master Card Send...";

  goToThankYou(){

    let firstname = this.navParams.get('firstname');
    let lastname = this.navParams.get('lastname');
    let tel = this.navParams.get('tel');
    let nationality = this.navParams.get('nationality');
    let dob = this.navParams.get('dob');
    let streetAddress = this.navParams.get('streetAddress');
    let country = this.navParams.get('country');
    let postalCode = this.navParams.get('postalCode');
    let city = this.navParams.get('city');
    let amount = this.navParams.get('amount');
    let account = this.navParams.get('account');
    let bic = this.navParams.get('bic');
    let ban = this.navParams.get('ban');
    let iban = this.navParams.get('iban');
    
    this.navCtrl.push(ThankyouPage, {
      firstname:firstname,
      lastname: lastname,
      tel:tel,
      nationality:nationality,
      account:account,
      dob: dob,
      streetAddress:streetAddress,
      country:country,
      postalCode:postalCode,
      city:city,
      amount:amount,
      bic:bic,
      ban:ban,
      iban:iban,
      tref: this.tref,
      pid: this.pid,
      bank_country: this.bank_country
    }); 
    
  }

  presentError(err){
    const alert = this.alert.create({
      title: 'An Error Occured !',
      subTitle: 'An error occured generating your transaction cost, please try again.',
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

    const alert = this.alert.create({
      title: 'Cancel Transaction!',
      subTitle: 'Are you sure you want to cancel this transaction?.',
      buttons: [{
        text: 'Yes',
        handler: data => {
          this.navCtrl.push(AccountsPage);
        }
      }, {
        text: 'Cancel',
        handler: data => {
          // Do Nothing
        }
      }]
    });
    alert.present();

    
  }

}