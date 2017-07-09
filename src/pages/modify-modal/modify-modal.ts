import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ViewController } from 'ionic-angular';

/**
 * Generated class for the ModifyModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-modify-modal',
  templateUrl: 'modify-modal.html',
})
export class ModifyModalPage {
    userId = "";
    lastName = "";
    firstName = "";
    coming = false;
    aperoInvited = false;
    aperoComing = false;
    mealInvited = false;
    mealComing = false;
    brunchInvited = false;
    brunchComing = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, public viewCtrl: ViewController) {
      this.userId = navParams.get('userId');
      this.lastName = navParams.get('lastName');
      this.firstName = navParams.get('firstName');
      this.coming = navParams.get('coming');
      this.aperoInvited = navParams.get('aperoInvited');
      this.aperoComing = navParams.get('aperoComing');
      this.mealInvited = navParams.get('mealInvited');
      this.mealComing = navParams.get('mealComing');
      this.brunchInvited = navParams.get('brunchInvited');
      this.brunchComing = navParams.get('brunchComing');
  }
    
    updateUser() {
        this.userService.modifyUser(this.userId, this.lastName, this.firstName, this.coming, this.aperoInvited, this.aperoComing, this.mealInvited, this.mealComing, this.brunchInvited, this.brunchComing);
        this.viewCtrl.dismiss();
    }

//  ionViewDidLoad() {
//    console.log('ionViewDidLoad ModifyModalPage');
//  }

}
