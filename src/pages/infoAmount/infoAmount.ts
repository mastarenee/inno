import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
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
  transaction_amount_error: string = "";

  public recipient_errors = [{
    transfer_error: 'Transfer Amount Required. <br/> Max Allowed 5000 USD ',
    bic_error: 'Bank Identifier Code is required',
  }]

  constructor(public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('item');

    this.userTransactionInformation = new FormGroup({
      transfer: new FormControl(''),
      bic: new FormControl(''), 
      iban: new FormControl(''), 
      ban: new FormControl(''), 
      bank_country: new FormControl(''), 
    });

    this.userTransactionInformation = this.formBuilder.group({
      transfer: ['0.00', Validators.required],
      iban: [''],
      ban: [''],
      bic: ['', Validators.compose([
        Validators.maxLength(11), 
        Validators.minLength(8),
        Validators.required])
      ],
      bank_country: ['GBR', Validators.required]
    });
  }

  ngOnInit() {
   
  }

  checkTransferFundsAvailable(){
    alert();
    let transferFinds = 0;
    if( this.userTransactionInformation.controls["transfer"].value > transferFinds ){
      this.transaction_amount_error = 'Account currently does not have sufficient funds';
    }else{
      this.transaction_amount_error = '';
    }
  }

  nextPage(event, accountsType) {
    
    if( this.userTransactionInformation.controls["transfer"].valid && 
    this.userTransactionInformation.controls["bic"].valid ){

      // Validate Information
      let transfer = this.userTransactionInformation.controls["transfer"].value;
      let bic = this.userTransactionInformation.controls["bic"].value;
      
      this.storage.get('transaction_details').then((val) => {
        
        if( !val ){
          val = []
        }

        val["transfer"] = transfer;
        val["bic"] = bic;
      
        this.storage.set('transaction_details',val);

        console.log('Your val is', val);
        
  
      });

      // Begin API Get Quote
      const loader = this.loaderCtrl.create({
        spinner: 'ios',
        content: "Calculating Your Transaction Fee...",
        duration: 3000
      });

      // Show Loading Action
      setTimeout(() => {
        this.navCtrl.push(ReviewPage);
      }, 3010);


    }else{

      if(this.userTransactionInformation.controls["transfer"].value == ''){
        this.userTransactionInformation.controls.transfer.markAsTouched();
      }

      if(this.userTransactionInformation.controls["bic"].value == ''){
        this.userTransactionInformation.controls.bic.markAsTouched();
      }

    }

  }

  public showIBAN = true;
  public showBAN = false;
  public showBIC = false;

  onSelectChange(selectedValue: any) {
    if( selectedValue == "GBR" ){
      this.showIBAN = true;
      this.showBAN = false;
      this.showBIC = false;
    }else{
      this.showIBAN = false;
      this.showBAN = true;
      this.showBIC = true;
    }
  }

  updateBankCountry(event){
    console.log(event);
  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }

}
