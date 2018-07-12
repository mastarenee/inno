import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ReviewPage } from '../review/review';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {

  account;
  transaction = {};
  private myForm: FormGroup;
  userRecipientBasicInformation: FormGroup;
  phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    
    this.account = navParams.get('item');

    this.userRecipientBasicInformation = new FormGroup({
      recipient_first_name: new FormControl(''),
      recipient_last_name: new FormControl(''),
      recipient_tel: new FormControl(''),
      recipient_nationality: new FormControl('')
    });

    this.userRecipientBasicInformation = this.formBuilder.group({
      recipient_first_name: ['', Validators.required],
      recipient_last_name: ['', Validators.required],
      recipient_tel: ['', Validators.required],
      recipient_nationality: ['', Validators.required]
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
    this.navCtrl.push(LoginPage);
  }

}
