import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import { InfoAddressPage } from '../InfoAddress/InfoAddress';
import { PhoneValidator } from '../../services/phone.validator';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage { 

  account;
  masks:any;
  phoneNumber: any = "";

  account_selected;
  phone;
  transaction = {};
  private myForm: FormGroup;
  userRecipientBasicInformation: FormGroup;

  public myModel = '';
  public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  public accountslists = [
    {
        alias: 'House Savings',
        amount: '98000',
        account:'******** 7402',
    },
    {
        alias: 'Investment Savings',
        amount: '8000',
        account:'******** 3833',
    },
    {
        alias: 'Business Savings',
        amount: '12000',
        account:'******** 8763',
    }
  ]

  private recipient_errors = [{
    firstname_error: 'First Name is required',
    lastname_error: 'Last Name is required',
    tel_error: 'Telelphone Number is required',
    street_address_error: 'Street Address is required',
  }]


  constructor( public storage: Storage, public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('item');

    this.userRecipientBasicInformation = new FormGroup({
      recipient_first_name: new FormControl(''),
      recipient_last_name: new FormControl(''),
      recipient_tel: new FormControl(''),
      recipient_nationality: new FormControl('BRB')
    });

    this.userRecipientBasicInformation = this.formBuilder.group({
      recipient_first_name: ['', Validators.required],
      recipient_last_name: ['', Validators.required],
      recipient_tel: ['', Validators.required],
      recipient_nationality: ['BRB', Validators.required]
    });
  }

  ngOnInit() {
    /*this.myForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required]
    });*/
    //this.phoneFormat.format(this.userRecipientBasicInformation.controls["recipient_tel"].value, this.phoneFormat.INTERNATIONAL);
  }

  accountSelected(event){
    console.log("event",event);
  }

  checkValidityFirstName(event){
    console.log(event);
  }

  formatTelephoneNumber(event){
    console.log(event);
    
    let tel = event.srcElement.value;
    if(tel.length+1 >= 11){
      let USNumber = tel.match(/(\d{3})(\d{3})(\d{4})/);
      console.log(USNumber);
      USNumber = "(" + USNumber[1] + ") " + USNumber[2] + "-" + USNumber[3];
      this.userRecipientBasicInformation.controls["recipient_tel"].setValue( USNumber );
    }

  }

  nextPage(event, accountsType) {

    if( this.userRecipientBasicInformation.controls["recipient_first_name"].valid && 
    this.userRecipientBasicInformation.controls["recipient_last_name"].valid &&
    this.userRecipientBasicInformation.controls["recipient_tel"].valid ){
          
      // Validate Information
      let firstname = this.userRecipientBasicInformation.controls["recipient_first_name"].value;
      let lastname = this.userRecipientBasicInformation.controls["recipient_last_name"].value;
      let tel = this.userRecipientBasicInformation.controls["recipient_tel"].value;
      let nationality = this.userRecipientBasicInformation.controls["recipient_nationality"].value;

      this.storage.ready().then(() => {
        
        this.storage.get('transaction_information').then((val) => {
        
          if( !val ){
            val = [];
          }
  
          val["account"] = this.account_selected;
          val["firstname"] = firstname;
          val["lastname"] = lastname;
          val["tel"] = tel;
          val["nationality"] = nationality;
        
          this.storage.set('transaction_information',val);
  
          console.log('Your val is', val);
          this.navCtrl.push(InfoAddressPage); 
        });

      });

    }else{

      if(this.userRecipientBasicInformation.controls["recipient_first_name"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_first_name.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_last_name"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_last_name.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_tel"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_tel.markAsTouched();
      }

      if(this.userRecipientBasicInformation.controls["recipient_nationality"].value == ''){
        this.userRecipientBasicInformation.controls.recipient_nationality.markAsTouched();
      }

    }

  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }

}
