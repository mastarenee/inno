import { NgModule } from '@angular/core';
import { IonicPageModule, NavController } from 'ionic-angular';
import { ThankyouPage } from './thankyou';
import { AccountsPage } from '../accounts/accounts';

@NgModule({
  declarations: [
    ThankyouPage,
  ],
  imports: [
    IonicPageModule.forChild(ThankyouPage),
  ],
})
export class ThankyouPageModule {

  constructor(public navCtrl: NavController) {

  }
  
}
