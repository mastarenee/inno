import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Printer, PrintOptions } from '@ionic-native/printer';
import { AccountsPage } from '../accounts/accounts';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { TransactionServices } from '../../services/transaction.services';

@IonicPage()
@Component({
  selector: 'page-thankyou',
  templateUrl: 'thankyou.html',
})
export class ThankyouPage {

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

  public recipient_city;
  public recipient_country;
  public recipient_postal_code;
  public account_name;
  public bic;

  transaction_ref;
  proposal_id;
  

  constructor(public alert: AlertController, public loaderCtrl: LoadingController, public transactionServices: TransactionServices, public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {

    this.transaction_ref = this.navParams.get('tref');
    this.proposal_id = this.navParams.get('pid');
    this.transaction_amount = this.navParams.get('trans_amount');
    
    this.transactionServices.get("firstname")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_name = res;
        },
        err => { // Error
          this.presentError(err);
        }
      );
    

    this.transactionServices.get("lastname")
      .then(
        res => { // Success
          console.log(res);
          this.recipient_name_last = res;
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

      this.transactionServices.get('account_name')
      .then(
        res => { // Success
          console.log(res);
          this.account_name = res;
        },
        err => { // Error
          console.error(err);
        }
      );

      this.transactionServices.get('bic')
      .then(
        res => { // Success
          console.log(res);
          this.bic = res;
        },
        err => { // Error
          console.error(err);
        }
      );

    console.log('ionViewDidLoad ThankyouPage');

    // Begin API Get Quote
    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Processing Your Information"
    });

    loader.present();

    this.transactionServices.doTransactionPayment(this.transaction_ref, this.proposal_id)
      .subscribe(data => {
        console.log(data);
        loader.dismiss();
      }, err => {
        loader.dismiss();
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