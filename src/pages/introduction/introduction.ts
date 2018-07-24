import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController } from 'ionic-angular';
import { AccountsPage } from '../accounts/accounts';
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'introduction.html'
})
export class IntroductionPage {
 
  constructor(private nativePageTransitions: NativePageTransitions, public navCtrl: NavController, private menu: MenuController) {
 
  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');

  }
 
  goToHome(){
    this.nativePageTransitions.fade(null);
    this.navCtrl.setRoot(AccountsPage);
  }
 
}