import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
//import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { TransactionHistoryPage } from '../transactionhistory/transactionhistory';
import { TransactionServices } from '../../services/transaction.services';
import { InfoPage } from '../info/info';

import { AccountService } from '../../services/accountServices';
//import { SenderInfoService } from '../../services/senderInfo';

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
  public accountID;

  public recipient_city;
  public recipient_country;
  public recipient_postal_code;
  public account_name;
  public bic;
  public ban;
  public iban;
  public bank_country;

  public transaction_ref;
  public proposal_id;
  public transaction_id;
  public status;
  public status_timestamp;
  public accountslists = [];
  public transfer_amount;
  public currency_for_transfer;
  public currency;

  constructor(public accountService:AccountService, public alert: AlertController, public loaderCtrl: LoadingController, public transactionServices: TransactionServices, public navCtrl: NavController, public navParams: NavParams) {

    
  }

  ionViewDidLoad() {

    this.account_transfer_from = this.navParams.get('account');
    this.charged_amt = this.navParams.get("charged_amt");
    this.recipient_name = this.navParams.get('firstname');
    this.recipient_name_last = this.navParams.get('lastname');
    this.recipient_city = this.navParams.get('dob');
    this.recipient_country = this.navParams.get('country');

    //this.sender_name = this.senderService.fetchUserData(76876876);
    
    this.recipient_tel = this.navParams.get('tel');
    this.recipient_nationality = this.navParams.get('nationality');
    
    this.recipient_address = this.navParams.get('streetAddress');
    this.recipient_postal_code = this.navParams.get('postalCode');
    this.recipient_city = this.navParams.get('city');
    this.account_name = this.navParams.get('account');
    this.bic = this.navParams.get('bic');
    this.ban = this.navParams.get('ban');
    this.iban = this.navParams.get('iban');
    this.bank_country = this.navParams.get("bank_country");
    this.accountID = this.navParams.get('accountID');

    this.transaction_ref = this.navParams.get('tref');
    this.proposal_id = this.navParams.get('pid');
    this.transfer_amount = this.navParams.get('amount');

    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Processing Your Information"
    });

    loader.present();

    this.transactionServices.doTransactionPayment( this.recipient_name, this.recipient_name_last, this.recipient_tel, this.recipient_nationality, this.recipient_city,this.recipient_address, this.recipient_country, this.recipient_postal_code, this.account_name, this.bic, this.ban, this.iban, this.proposal_id, this.transaction_ref )
      .subscribe(data => {
        
        console.log(data);
        loader.dismiss();
        
        this.status_timestamp = data.status_timestamp;
        this.status = data.status;
        this.transaction_status = data.status;
        this.transaction_id = data.transaction_id;

        this.currency = this.navParams.get("currency");
        let process_id = this.navParams.get("process_id");
        let transaction_ref = this.navParams.get("transaction_ref");

        let tempAccounts = this.accountService.getAccounts();
        for(let i=0; i<tempAccounts.length; i++)
        {
          console.log(tempAccounts[i].alias);
          if(tempAccounts[i].alias == this.account_transfer_from)
          {
            tempAccounts[i].amount = tempAccounts[i].amount -  this.charged_amt;
            this.accountService.updateAccount(i,tempAccounts[i].alias, tempAccounts[i].amount, tempAccounts[i].account);

            this.accountService.addNewAccountTransaction('House Savings',this.recipient_name,this.recipient_name_last, this.recipient_address, this.recipient_city, this.recipient_country, this.status_timestamp, this.charged_amt, this.bank_country, this.iban,  this.ban, this.bic, this.status, this.proposal_id, this.transaction_ref, this.currency);
            
          }
        }
        
        this.error_status = false;
      }, err => {
        loader.dismiss();
        this.error_status = true;
        this.presentError(err);
      });

      //setTimeout(() => {
        //console.log('Loading Successful');
        //loader.dismiss();
      //}, 3010);

      

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

  makeAnotherTransaction(){
    this.navCtrl.push(InfoPage);
  }

  goToHome(){
    this.navCtrl.push(AccountsPage);
  }

  viewTransactionDetails(){
    this.navCtrl.push(TransactionHistoryPage);
  }

}