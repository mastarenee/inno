import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import { InfoAmountPage } from '../infoAmount/infoAmount';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { TransactionServices } from '../../services/transaction.services'; 
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { InfoPage } from '../info/info';

import { ViewChild } from '@angular/core';
import { Navbar } from 'ionic-angular';

@Component({
  selector: 'page-infoAddress',
  templateUrl: 'infoAddress.html'
})
export class InfoAddressPage {

  @ViewChild(Navbar) navBar: Navbar;
  public account:string;
  transaction = {};
  private myForm: FormGroup;
  public userRecipientAddressInformation: FormGroup;
  public phoneNumber;
  public recipient_name:String;

  public recipient_errors = [{
    streetAddress_error: 'Street Address is required',
    country_error: 'Country is required',
    city_error: 'City is required',
    postal_code_error: 'Postal Code is required',
  }]
 
  constructor( private nativePageTransitions: NativePageTransitions, public alert:AlertController, public transactionServices: TransactionServices, public storage:Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.userRecipientAddressInformation = new FormGroup({
      recipient_streetAddress: new FormControl(''),
      recipient_country: new FormControl(''),
      recipient_postal_code: new FormControl(''),
      recipient_city: new FormControl(''),
    });

    this.userRecipientAddressInformation = this.formBuilder.group({
      recipient_streetAddress: ['', Validators.required],
      recipient_country: ['GBR', Validators.required],
      recipient_postal_code: ['', Validators.required],
      recipient_city: ['', Validators.required],
    });

  }

  ionViewDidLoad() {

    this.transactionServices.get("transaction_in_progress")
    .then(
      res => { // Success
        if(res == true){
          
          this.transactionServices.get('streetAddress').then(res => {
            this.userRecipientAddressInformation.controls["recipient_streetAddress"].setValue(res);
          });

          this.transactionServices.get('country').then(res => {
            this.userRecipientAddressInformation.controls["recipient_country"].setValue(res);
          });

          this.transactionServices.get('postal_code').then(res => {
            this.userRecipientAddressInformation.controls["recipient_postal_code"].setValue(res);
          });

          this.transactionServices.get('city').then(res => {
            this.userRecipientAddressInformation.controls["recipient_city"].setValue(res);
          });

        }
    });

    this.recipient_name = this.navParams.get('firstname') + ' ' + this.navParams.get('lastname');

    this.account = this.navParams.get('account');
    console.log(this.account);

    this.navBar.backButtonClick = (e:UIEvent)=>{
     // todo something
     this.cancelPage();
    }
  }

  nextPage(event) { 

    if( this.userRecipientAddressInformation.controls["recipient_streetAddress"].valid && 
    this.userRecipientAddressInformation.controls["recipient_country"].valid &&
    this.userRecipientAddressInformation.controls["recipient_postal_code"].valid &&
    this.userRecipientAddressInformation.controls["recipient_city"].valid ){
        
      // Validate Information
      let streetAddress = this.userRecipientAddressInformation.controls["recipient_streetAddress"].value;
      let country = this.userRecipientAddressInformation.controls["recipient_country"].value;
      let postalCode = this.userRecipientAddressInformation.controls["recipient_postal_code"].value;
      let city = this.userRecipientAddressInformation.controls["recipient_city"].value;
      
      this.transactionServices.set('streetAddress', streetAddress);
      this.transactionServices.set('country', country);
      this.transactionServices.set('postal_code', postalCode);
      this.transactionServices.set('city', city);

      // That's right, we're pushing to ourselves!
        
      let firstname = this.navParams.get('firstname');
      let lastname = this.navParams.get('lastname');
      let tel = this.navParams.get('tel');
      let nationality = this.navParams.get('nationality');
      let dob = this.navParams.get('dob');
      let accountID = this.navParams.get('accountID');
    
      this.nativePageTransitions.fade(null);
      this.navCtrl.push(InfoAmountPage, {
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
        accountID:accountID
      }); 

    }else{

      if(this.userRecipientAddressInformation.controls["recipient_streetAddress"].value == ''){
        this.userRecipientAddressInformation.controls.recipient_streetAddress.markAsTouched();
      }

      if(this.userRecipientAddressInformation.controls["recipient_country"].value == ''){
        this.userRecipientAddressInformation.controls.recipient_country.markAsTouched();
      }

      if(this.userRecipientAddressInformation.controls["recipient_postal_code"].value == ''){
        this.userRecipientAddressInformation.controls.recipient_postal_code.markAsTouched();
      }

      if(this.userRecipientAddressInformation.controls["recipient_city"].value == ''){
        this.userRecipientAddressInformation.controls.recipient_city.markAsTouched();
      }

    }

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

  editAccount(){
    this.navCtrl.push(InfoPage);
  }


}
