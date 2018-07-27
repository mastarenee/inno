import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';

@Component({
  selector: 'page-transactionhistorydetail',
  templateUrl: 'transactionhistorydetail.html'
})
export class TransactionHistoryDetailPage {

  public transactionNumber;
  public account_transfer_from = "House Savings";
  public recipient_name = "John Doe";
  public recipient_address = "#13 Warrens Great House";

  public refernce_id;
  public transaction_date;
  public transaction_status;
  public transaction_amount;

  public account;
  public firstname;
  public lastname;
  public streetaddress;
  public city;
  public country;
  public amount;
  public bank_country;
  public iban;
  public ban;
  public bic;
  public status;
  public process_id;
  public transaction_ref;
  public transaction_currency;

  constructor(public navCtrl: NavController, navParams: NavParams) {
    // come back to this this.transactionNumber = navParams.get('item');

    this.account_transfer_from = navParams.get('account');
    this.firstname = navParams.get('firstname');
    this.lastname = navParams.get('lastname');
    this.streetaddress = navParams.get('streetaddress');
    this.city = navParams.get('city');
    this.country = navParams.get('country');
    this.transaction_date = navParams.get('date');
    this.transaction_amount = navParams.get('amount');
    this.bank_country = navParams.get('bank_country');
    this.iban = navParams.get('iban');
    this.ban = navParams.get('ban');
    this.bic = navParams.get('bic');
    this.transaction_status = navParams.get('status');
    this.process_id = navParams.get('process_id');
    this.transaction_currency = navParams.get('currency');
    this.transaction_ref = navParams.get('transaction_ref');

    /*
    this.streetaddress = navParams.get('streetaddress');
    
    this.refernce_id = navParams.get('ref_id');
    this.transaction_date = navParams.get('date');
    this.transaction_status = navParams.get('status');
    this.transaction_amount = navParams.get('amount');

    this.account = navParams.get('account');
    this.firstname = navParams.get('firstname');
    this.lastname = navParams.get('lastname');
    
    this.city = navParams.get('city');
    this.country = navParams.get('country');
    this.date = navParams.get('date');
    this.amount = navParams.get('amount');
    this.bank_country = navParams.get('bank_country');
    this.iban = navParams.get('iban');
    this.ban = navParams.get('ban');
    this.bic = navParams.get('bic');
    this.status = navParams.get('status');
    this.process_id = navParams.get('process_id');
    this.transaction_ref = navParams.get('transaction_ref');
    this.transaction_currency = navParams.get('transaction_currency');*/
  }

}
