import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../info/info';
import { EditProfilePage } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }


  selectAccount(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(InfoPage, {
      item: accountsType 
    });
  }
  selectEditprofile(event, accountsType) {
    // That's right, we're pushing to ourselves!
    this.navCtrl.push(EditProfilePage);
  }
}
