import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
//import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { TransactionServices } from '../../services/transaction.services';
import { InfoPage } from '../info/info';

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

  constructor(public alert: AlertController, public loaderCtrl: LoadingController, public transactionServices: TransactionServices, public navCtrl: NavController, public navParams: NavParams) {

    
  }

  ionViewDidLoad() {

    this.transactionServices.get("user_accounts_lists")
    .then(
      res => { // Success

        console.log(res);

        let accountID = this.navParams.get('accountID');
        this.transaction_amount = this.navParams.get('charged_amt');
        let amount_total_cost = this.navParams.get('charged_amt');
        this.transfer_amount = this.navParams.get('amount');
        this.currency_for_transfer = this.navParams.get('currency');

        console.log(accountID);
        console.log(this.transaction_amount);
        
        let amountLeft = res[this.accountID]["amount"] - amount_total_cost;
        res[this.accountID]["amount"] = amountLeft;
        console.log(res);

        this.transactionServices.set("user_accounts_lists",res);
        console.log("Update Complete for " + this.accountID);

      }
    );
    

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
    this.bank_country = this.navParams.get("bank_country");
    this.accountID = this.navParams.get('accountID');

    this.transaction_ref = this.navParams.get('tref');
    this.proposal_id = this.navParams.get('pid');

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

        // Update to Storage
        this.transactionServices.get("transaction_list")
        .then(
          res => { // Success
            console.log(res);
            let transactionLists = res;

            res.push({
              account: this.account_transfer_from,
              firstname: this.recipient_name,
              lastname: this.recipient_name_last,
              streetaddress: this.recipient_address,
              city: this.recipient_city,
              country: this.recipient_country,
              date: this.status_timestamp,
              amount: this.transaction_amount,
              bank_country: this.bank_country,
              iban: this.iban,
              ban: this.ban,
              bic: this.bic,
              status: this.status,
              process_id: this.proposal_id,
              transaction_ref: this.transaction_ref, 
              transaction_id:this.transaction_id,
            });

            this.transactionServices.set("transaction_list",res);
            this.transactionServices.set("transaction_in_progress",false);

            // Clear History
            // Info Page
            this.transactionServices.set('firstname', null);
            this.transactionServices.set('lastname', null);
            this.transactionServices.set('tel', null);
            this.transactionServices.set('nationality', null);
            this.transactionServices.set('account_name', null);
            this.transactionServices.set('dob', null);
            
            // Address Information
            this.transactionServices.set('streetAddress', null);
            this.transactionServices.set('country', null);
            this.transactionServices.set('postal_code', null);
            this.transactionServices.set('city', null);

            // Amount Information
            this.transactionServices.set('transfer_amount', null);
            //this.transactionServices.set('bic', null);
            //this.transactionServices.set('ban', null);
            //this.transactionServices.set('iban', null);

            // amount
            
            //loader.dismiss();
          }
        );

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
    //this.navCtrl.push(TransactionHistoryDetailPage);
  }

}