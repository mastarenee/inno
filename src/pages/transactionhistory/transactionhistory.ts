import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../filter/filter';

@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {

  public refernce_id;
  public transaction_date;
  public transaction_status;
  public transaction_amount;


  //modalCtrl: any;
  //viewCtrl: any;
  
  public transactionLists = [
    {
      name: 'POS Withdrawal',
      date: 'July 6th 2018',
      amount: '$50.00',
      amount_left: '$7,102.00',
      icon: 'left-down-arrow-curve.png',
      type: '3833',
      transaction_id: '1290723678623',
      status: 'Pending',
    },
    {
      name: 'Massy Supermarkets',
      date: 'July 6th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '7402',
      transaction_id: '1290723678623',
      status: 'Completed',
    },
    {
      name: 'Wire Transfer',
      date: 'July 5th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'icon_transfer.png',
      type: '7402',
      transaction_id: '1290723678623',
      status: 'Completed',
    },
    {
      name: 'Rubis Wildey Gas Station',
      date: 'July 3rd 2018',
      amount: '$150.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '8763',
      transaction_id: '1290723678623',
      status: 'Completed',
    },
    {
      name: "Amazon AWS Credit Card Purchase",
      date: 'July 2nd 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'credit-card.png',
      type: '8763',
      transaction_id: '1290723678623',
      status: 'Rejected',
    }
  ]

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public navParams: NavParams) {


  }

  openTransaction(event, accountNumber, ref_id, date, status, amount) {
    

    // Open the Transaction Detail Page
    this.navCtrl.push(TransactionHistoryDetailPage, {
      item: accountNumber,
      ref_id:ref_id,
      date:date, 
      status:status,
      amount:amount
    });
  }

  openModal() {
    let profileModal = this.modalCtrl.create(FilterPage);
    profileModal.present();
  }
  
}
