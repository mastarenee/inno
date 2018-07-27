import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TransactionServices } from '../services/transaction.services';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { ChartsModule } from 'ng2-charts';
import { MbscModule } from '@mobiscroll/angular-lite';
import { AccountService } from '../services/accountServices';
import { AssistantPage } from '../pages/assistant/assistant';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AccountsPage } from '../pages/accounts/accounts';
import { IntroductionPage } from '../pages/introduction/introduction';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { TransactionHistoryPage } from '../pages/transactionhistory/transactionhistory';
import { TransactionHistoryDetailPage } from '../pages/transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../pages/filter/filter';

import { ProfilePage } from '../pages/profile/profile';
import { InfoPage } from '../pages/info/info';
import { InfoAddressPage } from '../pages/infoAddress/infoAddress';
import { InfoAmountPage } from '../pages/infoAmount/infoAmount';
import { ReviewPage } from '../pages/review/review';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ContactPage } from '../pages/contact/contact';
import { AccountsactivityPage } from '../pages/accountsactivity/accountsactivity';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    AccountsPage,
    ContactPage,
    IntroductionPage,
    EditProfilePage,
    ProfilePage,
    AssistantPage,
    AccountsactivityPage,
    TransactionHistoryPage,
    TransactionHistoryDetailPage,
    InfoPage,
    FilterPage,
    InfoAddressPage,
    InfoAmountPage,
    ReviewPage,
    ThankyouPage,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {}, { 
      links: [
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: AccountsPage, name: 'Accounts', segment: 'accounts' },
        { component: IntroductionPage, name: 'Introduction', segment: 'introduction' },
        { component: InfoPage, name: 'RecipientInfo', segment: 'recipientinfo' },
        { component: InfoAddressPage, name: 'RecipientAddress', segment: 'recipientaddress' },
        { component: InfoAmountPage, name: 'RecipientAmount', segment: 'recipientamount' },
        { component: ReviewPage, name: 'ReviewTransaction', segment: 'recipienttransaction' },
        { component: ThankyouPage, name: 'Confirm', segment: 'confirm' },
        { component: TransactionHistoryPage, name: 'TransactionHistory', segment: 'transactionhistory' },
        { component: TransactionHistoryDetailPage, name: 'TransactionHistoryDetails', segment: 'transactiondetails' },
        { component: ThankyouPage, name: 'Confirm', segment: 'confirm' },
        { component: EditProfilePage, name: 'EditProfile', segment: 'editprofile' },
        { component: ContactPage, name: 'contact', segment: 'contact' },
        { component: FilterPage, name: 'Filter', segment: 'filter' },
        { component: AccountsactivityPage, name: 'AccountActivty', segment: 'AccountActivty' },
      ]
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    AccountsPage,
    AssistantPage,
    IntroductionPage,
    EditProfilePage,
    TransactionHistoryPage,
    TransactionHistoryDetailPage,
    ProfilePage,
    FilterPage,
    ContactPage,
    AccountsactivityPage,
    InfoPage,
    InfoAddressPage,
    InfoAmountPage,
    ReviewPage,
    ThankyouPage,
  ],
  providers: [
    StatusBar,
    TransactionServices,
    AccountService,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
