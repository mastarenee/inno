import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { AccountsPage } from '../pages/accounts/accounts';
import { InfoPage } from '../pages/info/info';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { TransactionHistoryPage } from '../pages/transactionhistory/transactionhistory';
import { PopoverComponent } from '../components/popover/popover';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';

@Component({
  templateUrl: 'app.html' 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = EditProfilePage; 

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public popoverCtrl: PopoverController) {
    this.initializeApp(); 

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Transaction', component: AccountsPage },
      { title: 'Transaction History', component: TransactionHistoryPage },
      { title: 'Profile Page', component: ProfilePage},
      { title: 'Logout', component: false}
    ];

  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    
      this.nav.setRoot(page.component);
    
  }

}
