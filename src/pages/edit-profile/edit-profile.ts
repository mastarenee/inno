import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

public profaddress;
public profcity;
public profcountry;
public proftelephone;
public profemailaddress;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.profaddress = navParams.get('profaddress');
    this.profcity = navParams.get('profcity');
    this.profcountry = navParams.get('profcountry');
    this.proftelephone = navParams.get('proftelephone');
    this.profemailaddress = navParams.get('profemailaddress');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }
  selectProfile(event, profaddress,profcity,profcountry,proftelephone,profemailaddress) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(ProfilePage, {
      profaddress:profaddress,
      profcity:profcity,
      profcountry:profcountry,
      proftelephone:proftelephone,
      profemailaddress:profemailaddress
      
    });
  }
}
