import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ReviewPage } from '../review/review';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  account;
  transaction = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.account = navParams.get('item');
  }

  nextPage(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ReviewPage);
  }

  cancelPage(){
    this.navCtrl.push(HomePage);
  }

}
