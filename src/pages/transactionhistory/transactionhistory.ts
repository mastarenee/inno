import { Component } from '@angular/core';
import { NavController, ModalController, ViewController, LoadingController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { TransactionHistoryDetailPage } from '../transactionhistorydetail/transactionhistorydetail';
import { FilterPage } from '../filter/filter';
import { TransactionServices } from '../../services/transaction.services';
@Component({
  selector: 'page-transactionhistory',
  templateUrl: 'transactionhistory.html'
})
export class TransactionHistoryPage {
  //modalCtrl: any;
  //viewCtrl: any;
  
  public transactionLists = [];
  public user_account_information = [];

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
