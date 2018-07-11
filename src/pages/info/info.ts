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
  phoneNumber;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder) {
    this.account = navParams.get('item');
  }

  ngOnInit() {
      this.myForm = this.formBuilder.group({
        phoneNumber: ['', Validators.required]
      });
  }

  nextPage(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ReviewPage);
  }

  cancelPage(){
    this.navCtrl.push(LoginPage);
  }

}
