import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'introduction.html'
})
export class IntroductionPage {
 
  constructor(public navCtrl: NavController) {
 
  }
 
  goToHome(){
    this.navCtrl.setRoot(AccountsPage);
  }
 
}