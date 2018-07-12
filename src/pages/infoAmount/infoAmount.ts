import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import { AccountsPage } from '../accounts/accounts';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-infoAmount',
  templateUrl: 'infoAmount.html'
})
export class InfoAmountPage {

  account;
  transaction = {};
  private myForm: FormGroup;
  userRecipientBasicInformation: FormGroup;
  phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('item');

    this.userRecipientBasicInformation = new FormGroup({
      recipient_street_name: new FormControl(''),
      recipient_city: new FormControl(''),
      recipient_postal_code: new FormControl(''),
    });

    this.userRecipientBasicInformation = this.formBuilder.group({
      recipient_street_name: ['', Validators.required],
      recipient_city: ['', Validators.required],
      recipient_postal_code: ['', Validators.required]
    });
  }

  ngOnInit() {
    /*this.myForm = this.formBuilder.group({
      phoneNumber: ['', Validators.required]
    });*/
  }

  nextPage(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ReviewPage);
  }

  cancelPage(){
    this.navCtrl.push(AccountsPage);
  }

}
