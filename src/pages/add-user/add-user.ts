import { Component } from '@angular/core';
import {IonicPage, NavController, ToastController} from 'ionic-angular';
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
        children: 0,
        couple: false,
        secondLastName: "",
        secondFirstName: ""
    }

  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public toastCtrl: ToastController) {
  }

    addUser() {
      this.newUser.children = Number(this.newUser.children)
      this.userService.addUser(this.newUser).then(_ => {
        let toast = this.toastCtrl.create({
          message: this.newUser.lastName + " " + this.newUser.firstName + (!this.newUser.couple ? " a été invité" :
          " et " + this.newUser.secondLastName + " " + this.newUser.secondFirstName + " ont été invité"),
          duration: 3000,
          position: 'top'
        });

        toast.present();

        this.navCtrl.pop();
      })
    }

  ionViewDidLoad() {
  }

}
