import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services';
import { Navbar } from 'ionic-angular';

@Component({
  selector: 'page-infoAmount',
  templateUrl: 'infoAmount.html'
})
export class InfoAmountPage {

  @ViewChild(Navbar) navBar: Navbar;

  public account;
  public amount_to_transfer = 5000;
  public transaction = {};
  private myForm: FormGroup;
  userTransactionInformation: FormGroup;
  public phoneNumber;
  public recipient_name;
  public transaction_amount_error: string = "";
  public amountLeft;
  public over_amount_error;
  public sender_country_currency;
  public conversion_rate;

  public recipient_errors = [{
    transfer_error: 'Transfer Amount Required. <br/> Max Allowed 5000 USD ',
    bic_error: 'Bank Identifier Code is required',
  }]

  constructor( public alert:AlertController, public transactionServices: TransactionServices, public loaderCtrl: LoadingController, public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('account');

    this.userTransactionInformation = new FormGroup({
      transfer: new FormControl('500'),
      transfer_amount: new FormControl('500'),
      bic: new FormControl('TDOMCATTTOR'), 
      iban: new FormControl('GB98MIDL07009312345678'), 
      ban: new FormControl('6539354'), 
      bank_country: new FormControl(''), 
    });

    this.userTransactionInformation = this.formBuilder.group({
      transfer: ['500.00', Validators.required],
      transfer_amount: ['500', Validators.required],
      iban: ['GB98MIDL07009312345678'],
      ban: ['6539354'],
      bic: ['TDOMCATTTOR'],
      bank_country: ['GBR', Validators.required]
    });
  }

  ionViewDidLoad() {

    let country_currency = this.navParams.get('country');
    
    if(country_currency=="GBR")
    {
      this.sender_country_currency = "GBP";
      this.conversion_rate = 2.66;
    }
    else if(country_currency=="CAN")
    {
      this.sender_country_currency = "CAD";
      this.conversion_rate = 1.54;
    }
    
    this.transactionServices.get("transaction_in_progress")
    .then(
      res => { // Success
        if(res == true){
          
          this.transactionServices.get('transfer_amount').then(res => {
            this.userTransactionInformation.controls["transfer_amount"].setValue(res);
          });

          /*this.transactionServices.get('bic').then(res => {
            this.userTransactionInformation.controls["bic"].setValue(res);
          });

          this.transactionServices.get('ban').then(res => {
            this.userTransactionInformation.controls["ban"].setValue(res);
          });

          this.transactionServices.get('iban').then(res => {
            this.userTransactionInformation.controls["iban"].setValue(res);
          });*/
        }

    });

    this.transactionServices.get("user_accounts_lists")
    .then(
      res => { // Success

        console.log(res);

        let accountID = this.navParams.get('accountID');
        console.log(accountID);
        
        if(accountID){
          this.amountLeft = res[accountID]["amount"];
        }

      }
    );
 
    this.recipient_name = this.navParams.get('firstname') + ' ' + this.navParams.get('lastname');

    this.account = this.navParams.get('account');
    console.log(this.account);

    this.navBar.backButtonClick = (e:UIEvent)=>{
     // todo something
     this.cancelPage();
    }
  }

  updateTranfer(event){
    this.userTransactionInformation.controls["transfer"].setValue( this.userTransactionInformation.controls["transfer_amount"].value );
    //console.log(event);
    let bbdRate = this.userTransactionInformation.controls["transfer"].value * this.conversion_rate;
    if( this.amountLeft < bbdRate ){
      this.over_amount_error = "Insufficient Balance Available";
    }else{
      this.over_amount_error = "";
    }
  }

  checkTransferFundsAvailable(event){
    console.log("checkTransferFundsAvailable is ");
    console.log(event);
    //console.log(event.target.valueAsNumber);
    this.userTransactionInformation.controls["transfer_amount"].setValue( event.target.valueAsNumber );
  }

  nextPageTest(){

      // Validate Information
      let transfer = this.userTransactionInformation.controls["transfer"].value;
      let bic = this.userTransactionInformation.controls["bic"].value;
      let ban = this.userTransactionInformation.controls["ban"].value;
      let iban = this.userTransactionInformation.controls["iban"].value;
      let bank_country = this.userTransactionInformation.controls["bank_country"].value;

      // Show Loading Action

      let firstname = this.navParams.get('firstname');
      let lastname = this.navParams.get('lastname');
      let tel = this.navParams.get('tel');
      let nationality = this.navParams.get('nationality');
      let dob = this.navParams.get('dob');
      let streetAddress = this.navParams.get('streetAddress');
      let country = this.navParams.get('country');
      let postalCode = this.navParams.get('postalCode');
      let city = this.navParams.get('city');
      let accountID = this.navParams.get('accountID');

      //alert("push to review page");

      //this.nativePageTransitions.fade(null);
      this.navCtrl.push(ReviewPage, {
        firstname:firstname,
        lastname: lastname,
        tel:tel,
        nationality:nationality,
        account:this.account,
        dob: dob,
        streetAddress:streetAddress,
        country:country,
        postalCode:postalCode,
        city:city,
        amount:transfer,
        bic:bic,
        ban:ban,
        iban:iban,
        bank_country:bank_country,
        accountID:accountID
      }); 
  }

  nextPage(event, accountsType) {

    let bbdRate = this.userTransactionInformation.controls["transfer"].value * this.conversion_rate;
    if( this.amountLeft > bbdRate){
      alert("this.amountLeft > bbdRate");
      
    if( this.userTransactionInformation.controls["transfer"].valid && 
    this.userTransactionInformation.controls["bic"].valid ){
      
      alert("valid");

      // Validate Information
      let transfer = this.userTransactionInformation.controls["transfer"].value;
      let bic = this.userTransactionInformation.controls["bic"].value;
      let ban = this.userTransactionInformation.controls["ban"].value;
      let iban = this.userTransactionInformation.controls["iban"].value;
      let bank_country = this.userTransactionInformation.controls["bank_country"].value;

      this.transactionServices.set('transfer_amount', transfer);
      this.transactionServices.set('bic', bic);
      this.transactionServices.set('ban', bic);
      this.transactionServices.set('iban', bic);

      // Show Loading Action

      let firstname = this.navParams.get('firstname');
      let lastname = this.navParams.get('lastname');
      let tel = this.navParams.get('tel');
      let nationality = this.navParams.get('nationality');
      let dob = this.navParams.get('dob');
      let streetAddress = this.navParams.get('streetAddress');
      let country = this.navParams.get('country');
      let postalCode = this.navParams.get('postalCode');
      let city = this.navParams.get('city');
      let accountID = this.navParams.get('accountID');

      alert("push to review page");

      //this.nativePageTransitions.fade(null);
      this.navCtrl.push(ReviewPage, {
        firstname:firstname,
        lastname: lastname,
        tel:tel,
        nationality:nationality,
        account:this.account,
        dob: dob,
        streetAddress:streetAddress,
        country:country,
        postalCode:postalCode,
        city:city,
        amount:transfer,
        bic:bic,
        ban:ban,
        iban:iban,
        bank_country:bank_country,
        accountID:accountID
      }); 

    }else{

      alert("else");

      if(this.userTransactionInformation.controls["transfer"].value == ''){
        this.userTransactionInformation.controls.transfer.markAsTouched();
        alert("Transfer Issue");
      }

      if(this.userTransactionInformation.controls["bic"].value == ''){
        this.userTransactionInformation.controls.bic.markAsTouched();
        alert("Bic Issue");
      }

      if(this.amountLeft > this.userTransactionInformation.controls["transfer"].value){
        this.over_amount_error = "Insufficient Balance Available. Balance: $" + this.amountLeft;
        alert("Insufficient");
      }

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

    const alert = this.alert.create({
      title: 'Cancel Transaction!',
      subTitle: 'Are you sure you want to cancel this transaction?.',
      buttons: [{
        text: 'Yes',
        handler: data => {
          this.navCtrl.push(AccountsPage);
        }
      }, {
        text: 'Cancel',
        handler: data => {
          // Do Nothing
        }
      }]
    });
    alert.present();

    
  }


}
