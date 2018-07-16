import { Component } from '@angular/core';
import { NavController, ModalController, ViewController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {
  //modalCtrl: any;
  //viewCtrl: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController) {

  }

  openTransaction(event, accountNumber) {
    
    // Open the Transaction Detail Page
    this.navCtrl.push(TransactionHistoryDetailPage, {
      item: accountNumber 
    });
  }

  openModal() {
    let profileModal = this.modalCtrl.create(FilterPage);
    profileModal.present();
  }
  
}
