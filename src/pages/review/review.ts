import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { ThankyouPage } from '../thankyou/thankyou';
import { AccountsPage } from '../accounts/accounts';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-review',
  templateUrl: 'review.html'
})
export class ReviewPage {

  constructor(public storage:Storage, public navCtrl: NavController) {

  }

  ionViewDidEnter(){

    this.storage.get('transaction_information').then((val) => {
        
      this.storage.set('transaction_information',val);

      console.log('Your val is', val);
    });

  }


  selectAccount(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }

  goToThankYou(){
    this.navCtrl.push(ThankyouPage);
  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }
}
