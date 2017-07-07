import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the AddUserPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-user',
  templateUrl: 'add-user.html',
    providers: [UserServiceProvider]
})
export class AddUserPage {
    lastName = "";
    firstName = "";
    coming = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
  }

    addUser() {
//        var newUser = {
//            lastname: this.lastName,
//            firstName: this.firstName,
//            coming: this.coming
//        }
        this.userService.addUser(this.lastName, this.firstName, this.coming).then((result) => {
            console.log(result);
        }, (err) => {
            console.log(err);
        })
        this.navCtrl.pop();
    }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad AddUserPage');
  }

}
