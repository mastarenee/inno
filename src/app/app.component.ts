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
import { TransactionServices } from '../services/transaction.services';

declare var window;

@Component({
  templateUrl: 'app.html' 
})

export class MyApp {
  [x: string]: any;
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;  

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public transactionServices:TransactionServices, public storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public popoverCtrl: PopoverController) {
    
    this.initializeApp(); 

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: AccountsPage, icon: 'home.png' },
      { title: 'New Transaction', component: InfoPage, icon: 'menu_transfer.png' },
      { title: 'Transaction History', component: TransactionHistoryPage, icon: 'menu_history.png' },
      { title: 'Profile Page', component: ProfilePage, icon: 'menu_user.png'},
      { title: 'Contact Us', component: ContactPage, icon: 'contact.png'}


    ];
  
  }

  ngOnInit() {

    let userTransactionLists = [
      {
        account: 'House Savings',
        firstname: 'John',
        lastname: 'Doe',
        streetaddress: '#13 Warrens House',
        city: 'Texas',
        country: 'USA',
        date: '2018-07-21T13:14:40-05:00',
        amount: '50.00',
        bank_country: 'GBR',
        iban: '0123653935',
        ban: '',
        bic: '',
        status: 'pending',
        process_id: '1290723678623',
        transaction_ref: '435ubsd79a9das877',
      },
      {
        account: 'Online Chequing',
        firstname: 'Fredrick',
        lastname: 'Smith',
        streetaddress: '#15 Warrens House',
        city: 'Texas',
        country: 'USA',
        date: '2018-07-22T13:14:40-05:00',
        amount: '30.00',
        bank_country: 'GBR',
        iban: '000400012',
        ban: '',
        bic: '',
        status: 'pending',
        process_id: '1290723678623',
        transaction_ref: '435ubsd79a9das877',
      },
      {
        name: 'Business Savings',
        firstname: 'Fredrick',
        lastname: 'Smith',
        streetaddress: '#15 Warrens House',
        city: 'Texas',
        country: 'USA',
        date: '2018-07-23T13:12:10-05:00',
        amount: '30.00',
        bank_country: 'GBR',
        iban: '000400012',
        ban: '',
        bic: '',
        status: 'pending',
        process_id: '1290723678623',
        transaction_ref: '435ubsd79a9das877',
      },
      {
        name: 'Business Savings',
        firstname: 'Fredrick',
        lastname: 'Smith',
        streetaddress: '#15 Warrens House',
        city: 'Texas',
        country: 'USA',
        date: '2018-07-22T13:14:40-05:00',
        amount: '30.00',
        bank_country: 'GBR',
        iban: '000400012',
        ban: '',
        bic: '',
        status: 'pending',
        process_id: '1290723678623',
        transaction_ref: '435ubsd79a9das877',
      },
      {
        name: "Online Chequing",
        firstname: 'Fredrick',
        lastname: 'Smith',
        streetaddress: '#15 Warrens House',
        city: 'Texas',
        country: 'USA',
        date: '2018-07-24T11:14:40-05:00',
        amount: '30.00',
        bank_country: 'GBR',
        iban: '000400012',
        ban: '',
        bic: '',
        status: 'pending',
        process_id: '1290723678623',
        transaction_ref: '435ubsd79a9das877',
      }
    ]

    let accountslists = [
      {
          alias: 'House Savings',
          amount: '98,000,000',
          accountNumber: '...7402',
      },
      {
          alias: 'Online Chequing',
          amount: '8,000',
          accountNumber:'...3833',
      },
      {
          alias: 'Business Savings',
          amount: '12,000',
          accountNumber:'...8763',
      },
      {
        alias: 'College Savings',
        amount: '1,000',
        accountNumber:'...4509',
      },
      {
        alias: 'Student Chequing',
        amount: '300',
        accountNumber:'...7184',
      }
    ]

    this.transactionServices.set("transaction_list",userTransactionLists);
    this.transactionServices.set("user_accounts_lists",accountslists);
    
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
      window["ApiAIPlugin"].init(
        {
            clientAccessToken: "3896185990244a4196c34ea8bd9f70ae", // insert your client access key here
            lang: "en" // set lang tag from list of supported languages
        }, 
        function(result) { 
          alert(result);
         },
        function(error) { alert(error);
        }
    );
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
