import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, LoadingController, NavParams } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../filter/filter';
import { TransactionServices } from '../../services/transaction.services';
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
  
<<<<<<< HEAD
  public transactionLists = [];
  public user_account_information = [];
=======
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
>>>>>>> ac01fb2fb639af212fd8c5a597f81bd32fc28aaf

  public start_date;
  public end_date;
  public type;
  public showOverlay = false;
  public totalAmount = 5000;

  constructor(public transactionServices:TransactionServices, public loaderCtrl: LoadingController, public navCtrl: NavController, public modalCtrl: ModalController) {
    
    this.transactionServices.get("transaction_list").then(function(result){
      console.log("result for transaction list");
      console.log(result);
      //this.transactionLists = result; 
    });

    this.transactionServices.get("transaction_list")
    .then(
      res => { // Success
        console.log(res);
        this.transactionLists = res; 
      }
    );
  }

  getBalance(amount){
    return this.totalAmount - amount;
  }

  ionViewDidLoad() {

<<<<<<< HEAD

=======
  constructor(public navParams: NavParams, public loaderCtrl: LoadingController, public navCtrl: NavController, public modalCtrl: ModalController) {
>>>>>>> ac01fb2fb639af212fd8c5a597f81bd32fc28aaf
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

  delete(chip: Element, option) {
    chip.remove();
    if( option == 'type'){
      this.type = '';
    }
  }

  openModal() {
    let profileModal = this.modalCtrl.create(FilterPage);
    profileModal.present();
    this.showOverlay = true;

    profileModal.onDidDismiss(data => {
      
      this.showOverlay = false;

      const loader = this.loaderCtrl.create({
        spinner: 'ios',
        content: "Apply Filters ...",
        duration: 1000
      });

      loader.present();
      
      this.type = data.type;
      this.start_date = data.start_date;
      this.end_date = data.end_date;

      console.log(data);
    });
    
  }

  checkFilter(status){

    if(this.type){
      if(this.type == status){
        return true;
      }else{
        return false;
      }
    }else{
      return true;
    }

  }
  
}
