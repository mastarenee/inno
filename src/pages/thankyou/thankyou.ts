import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { AccountsPage } from '../accounts/accounts';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { TransactionServices } from '../../services/transaction.services';

import { SenderInfoService } from '../../services/senderInfo';

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

  public sender_name;

  public transaction_amount = "";
  public transaction_fee;
  public total_transaction_fee;
  public transaction_total;
  public recipient_name;
  public recipient_name_last;
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
  public error_status;
  public transaction_status;

  public recipient_city;
  public recipient_country;
  public recipient_postal_code;
  public account_name;
  public bic;
  public ban;
  public iban;

  public transaction_ref;
  public proposal_id;

  constructor(public alert: AlertController, public loaderCtrl: LoadingController, public transactionServices: TransactionServices, public navCtrl: NavController, public navParams: NavParams, private senderService: SenderInfoService) {}

  ionViewDidLoad() {

    //this.sender_name = this.senderService.fetchUserData(76876876);

    this.recipient_name = this.navParams.get('firstname');
    this.recipient_name_last = this.navParams.get('lastname');
    
    this.recipient_tel = this.navParams.get('tel');
    this.recipient_nationality = this.navParams.get('nationality');
    this.recipient_city = this.navParams.get('dob');
    this.recipient_address = this.navParams.get('streetAddress');
    this.recipient_country = this.navParams.get('country');
    this.recipient_postal_code = this.navParams.get('postalCode');
    this.recipient_city = this.navParams.get('city');
    this.account_name = this.navParams.get('account');
    this.bic = this.navParams.get('bic');
    this.ban = this.navParams.get('ban');
    this.iban = this.navParams.get('iban');
    this.account_transfer_from = this.navParams.get('account');

    this.transaction_ref = this.navParams.get('tref');
    this.proposal_id = this.navParams.get('pid');
    this.transaction_amount = this.navParams.get('amount');
    
    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Processing Your Information"
    });

    loader.present();

    this.transaction_ref = this.navParams.get('tref');
    this.proposal_id = this.navParams.get('pid');
    this.transaction_amount

    this.transactionServices.doTransactionPayment( this.recipient_name, this.recipient_name_last, this.recipient_tel, this.recipient_nationality, this.recipient_city,this.recipient_address, this.recipient_country, this.recipient_postal_code, this.account_name, this.bic, this.ban, this.iban, this.proposal_id, this.transaction_ref )
      .subscribe(data => {
        console.log(data);
        loader.dismiss();
        this.error_status = false;
      }, err => {
        loader.dismiss();
        this.error_status = true;
        this.presentError(err);
      });

      setTimeout(() => {
        //console.log('Loading Successful');
        loader.dismiss();
      }, 3010);
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


  goToHome(){
    this.navCtrl.push(AccountsPage);
  }

  viewTransactionDetails(){
    this.navCtrl.push(TransactionHistoryDetailPage);
  }

}