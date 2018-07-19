import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, PopoverController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { AccountsPage } from '../pages/accounts/accounts';
import { InfoPage } from '../pages/info/info';
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';
import { TransactionHistoryPage } from '../pages/transactionhistory/transactionhistory';
import { PopoverComponent } from '../components/popover/popover';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ContactPage } from '../pages/contact/contact';

@Component({
  templateUrl: 'app.html' 
})

export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;  

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public popoverCtrl: PopoverController) {
    
    this.initializeApp(); 

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'New Transaction', component: AccountsPage, icon: 'menu_transfer.png' },
      { title: 'Transaction History', component: TransactionHistoryPage, icon: 'menu_history.png' },
      { title: 'Profile Page', component: ProfilePage, icon: 'menu_user.png'},
      { title: 'Contact Us', component: ContactPage, icon: 'contact.png'}


    ];
  
  }

  ngOnInit() {
    
    this.storage.get('user_id').then((result) => {
      if( result ){
        // Check last login
        //this.storage.get('user_last_login').then((last_login_result) => {
          // Once the user is logged in for less than 10 mins
          // Show the Accounts Page
          //if( last_login_result <= 60*2*10 ){
            this.rootPage = AccountsPage;
          }else{
            this.rootPage = LoginPage;
          //}
       // });

      }
    });

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

  
  goToLogin(){
    this.nav.push(LoginPage);
  }
}
