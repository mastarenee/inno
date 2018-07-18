import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

/**
 * Generated class for the AccountsactivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-accountsactivity',
  templateUrl: 'accountsactivity.html',
})
export class AccountsactivityPage {

  public accountslists = [
    {
        alias: 'House Savings',
        amount: '98000',
        account_num: '7402',
        selected: true,
    },
    {
        alias: 'Investment Savings',
        amount: '8000',
        account_num:'3833',
        selected: false,
    },
    {
        alias: 'Business Savings',
        amount: '12000',
        account_num:'8763',
        selected: false,
    }
  ]

  public transactionLists = [
    {
      name: 'POS Withdrawal',
      date: 'July 6th 2018',
      amount: '$50.00',
      amount_left: '$7,102.00',
      icon: 'left-down-arrow-curve.png',
      type: '3833',
    },
    {
      name: 'Massy Supermarkets',
      date: 'July 6th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '7402',
    },
    {
      name: 'Wire Transfer',
      date: 'July 5th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'icon_transfer.png',
      type: '7402',
    },
    {
      name: 'Rubis Wildey Gas Station',
      date: 'July 3rd 2018',
      amount: '$150.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '8763',
    },
    {
      name: "Amazon AWS Credit Card Purchase",
      date: 'July 2nd 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'credit-card.png',
      type: '8763',
    }
  ]

  account_selected;
  showAccounts = true;

  constructor(public loaderCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
    this.account_selected = "7402";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountsactivityPage');
  }

  showAccount(event){

    this.showAccounts = false;
    console.log(event);

    const loader = this.loaderCtrl.create({
      spinner: 'ios',
      content: "Loading Account Information for ******* " + event,
      duration: 3000
    });
   
    loader.present();

    setTimeout(() => {
      console.log('Loading Successful');
      this.showAccounts = true;
    }, 3010);
    
  }

}
