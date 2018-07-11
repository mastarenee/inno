import { Component } from '@angular/core';
import { NavController, MenuController, AlertController, App, ViewController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { AccountsPage } from '../accounts/accounts';
import {Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  userInformation = {}
  userError: String = "";
  userLoginForm: FormGroup;

  loginForm() {
    console.log(this.userInformation);
  }

  constructor(private formBuilder: FormBuilder, public viewCtrl: ViewController, public app: App, private alert: AlertController, private menu: MenuController, public navCtrl: NavController) {

    this.userLoginForm = new FormGroup({
      account: new FormControl(''),
      password: new FormControl('')
    });

    this.userInformation = formBuilder.group({
      account: ['', Validators.compose([
        Validators.maxLength(16), 
        Validators.minLength(16),
        Validators.pattern('[a-zA-Z ]*'), 
        Validators.required])
      ],
      password: ['', Validators.compose([Validators.required])],
    });

  }

  ionViewDidEnter() {
    this.menu.swipeEnable(false);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(false, 'menu1');
  }

  ionViewWillLeave() {
    // Don't forget to return the swipe to normal, otherwise 
    // the rest of the pages won't be able to swipe to open menu
    this.menu.swipeEnable(true);

    // If you have more than one side menu, use the id like below
    // this.menu.swipeEnable(true, 'menu1');
  }

  openForgotPassword(){
    
    const alert = this.alert.create({
      title: 'Forgot Password!',
      subTitle: 'Please visit CIBC FirstCaribbean Online Banking website to reset your password.',
      buttons: [{
        text: 'OK',
        handler: data => {
          console.log('Cancel clicked');
        }
      }, {
        text: 'Visit Site',
        handler: data => {
          window.location.href = "https://www.cibc.com/fcib";
        }
      }]
    });
    alert.present();

  }

  goToAccount(){
    
    if( this.userLoginForm.controls["account"].valid && this.userLoginForm.controls["password"].valid ){
      this.app.getRootNav().push(AccountsPage);
    } 

  }
}
