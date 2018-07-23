import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, LoadingController } from 'ionic-angular';
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
  
  public transactionLists = [
    {
      name: 'POS Withdrawal',
      date: 'July 6th 2018',
      amount: '$50.00',
      amount_left: '$7,102.00',
      icon: 'left-down-arrow-curve.png',
      type: '3833',
      transaction_id: '1290723678623',
      status: 'pending',
    },
    {
      name: 'Massy Supermarkets',
      date: 'July 6th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '7402',
      transaction_id: '1290723678623',
      status: 'completed',
    },
    {
      name: 'Wire Transfer',
      date: 'July 5th 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'icon_transfer.png',
      type: '7402',
      transaction_id: '1290723678623',
      status: 'completed',
    },
    {
      name: 'Rubis Wildey Gas Station',
      date: 'July 3rd 2018',
      amount: '$150.00',
      amount_left: '$7,402.00',
      icon: 'arrow-curve-pointing-to-right.png',
      type: '8763',
      transaction_id: '1290723678623',
      status: 'completed',
    },
    {
      name: "Amazon AWS Credit Card Purchase",
      date: 'July 2nd 2018',
      amount: '$300.00',
      amount_left: '$7,402.00',
      icon: 'credit-card.png',
      type: '8763',
      transaction_id: '1290723678623',
      status: 'rejected',
    }
  ]

  public start_date;
  public end_date;
  public type;
  public showOverlay = false;

  constructor(public loaderCtrl: LoadingController, public navCtrl: NavController, public modalCtrl: ModalController) {

  }
  
  openTransaction(event, accountNumber) {
    
    // Open the Transaction Detail Page
    this.navCtrl.push(TransactionHistoryDetailPage, {
      item: accountNumber 
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
