import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { Events } from 'ionic-angular';

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
    newUser = {
        lastName: "",
        firstName: "",
        coming: false,
        apero: {
            invited: false,
            coming: false
        },
        meal: {
            invited: false,
            coming: false
        },
        brunch: {
            invited: false,
            coming: false
        },
        children: "0"
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, public events: Events) {
  }

    addUser() {
        this.userService.addUser(this.newUser).then((result) => {
            this.events.publish('addedUser', this.newUser.lastName, this.newUser.firstName)
            this.navCtrl.pop();
        }, (err) => {
            console.log(err);
        })
    }

  ionViewDidLoad() {
  }

}
