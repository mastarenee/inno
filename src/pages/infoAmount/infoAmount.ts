import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-infoAmount',
  templateUrl: 'infoAmount.html'
})
export class InfoAmountPage {

  account;
  transaction = {};
  private myForm: FormGroup;
  userTransactionInformation: FormGroup;
  phoneNumber;

  public recipient_errors = [{
    transfer_error: 'Transfer Amount Required. <br/> Max Allowed 5000 USD ',
    bic_error: 'Bank Identifier Code is required',
  }]

  constructor(public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('item');

    this.userTransactionInformation = new FormGroup({
      transfer: new FormControl(''),
      bic: new FormControl(''), 
    });

    this.userTransactionInformation = this.formBuilder.group({
      transfer: ['0.00', Validators.required],
      bic: ['', Validators.required],
    });
  }

  ngOnInit() {

  }

  nextPage(event, accountsType) {
    
    if( this.userTransactionInformation.controls["transfer"].valid && 
    this.userTransactionInformation.controls["bic"].valid ){

      // Validate Information
      let transfer = this.userTransactionInformation.controls["transfer"].value;
      let bic = this.userTransactionInformation.controls["bic"].value;

      this.storage.get('transaction_information').then((val) => {
        
        val["transfer"] = transfer;
        val["bic"] = bic;
      
        this.storage.set('transaction_information',val);

        console.log('Your val is', val);
      });

      this.navCtrl.push(ReviewPage);

    }else{

      if(this.userTransactionInformation.controls["transfer"].value == ''){
        this.userTransactionInformation.controls.transfer.markAsTouched();
      }

      if(this.userTransactionInformation.controls["bic"].value == ''){
        this.userTransactionInformation.controls.bic.markAsTouched();
      }

    }

  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }

}
