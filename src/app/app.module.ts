import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { AccountsPage } from '../pages/accounts/accounts';
import { InfoPage } from '../pages/info/info';
import { InfoAddressPage } from '../pages/InfoAddress/InfoAddress';
import { InfoAmountPage } from '../pages/InfoAmount/InfoAmount';
import { ReviewPage } from '../pages/review/review';
import { ProfilePage } from '../pages/profile/profile';
import { TransactionHistoryPage } from '../pages/transactionhistory/transactionhistory';
import { TransactionHistoryDetailPage } from '../pages/transactionhistorydetail/transactionhistorydetail';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ThankyouPage } from '../pages/thankyou/thankyou';
import { PopoverComponent } from '../components/popover/popover';
import { InternationalPhoneModule } from 'ng4-intl-phone';
import { IonicStorageModule } from '@ionic/storage';
import { EditProfilePage } from '../pages/edit-profile/edit-profile';
import { ContactPage } from '../pages/contact/contact';
import { FilterPage } from '../pages/filter/filter';
import { AccountsactivityPage } from '../pages/accountsactivity/accountsactivity';
import {NgxMaskModule} from 'ngx-mask'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    AccountsPage,
    InfoPage,
    InfoAddressPage,
    InfoAmountPage,
    ReviewPage,
    ProfilePage,
    TransactionHistoryPage,
    TransactionHistoryDetailPage,
    ListPage,
    ThankyouPage,
    EditProfilePage,
    PopoverComponent,
    ContactPage,
    FilterPage,
    AccountsactivityPage
  ],
  imports: [
    BrowserModule,
    InternationalPhoneModule,
    IonicModule.forRoot(MyApp),
    NgxMaskModule.forRoot(),
    IonicStorageModule.forRoot({
      name: '__mydb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    AccountsPage,
    InfoPage,
    InfoAddressPage,
    InfoAmountPage,
    ReviewPage,
    ProfilePage,
    TransactionHistoryPage,
    TransactionHistoryDetailPage,
    ListPage,
    ThankyouPage,
    EditProfilePage,
    PopoverComponent,
    ContactPage,
    FilterPage,
    AccountsactivityPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    Storage,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
