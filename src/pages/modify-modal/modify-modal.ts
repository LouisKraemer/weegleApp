import { Component } from '@angular/core';
import {IonicPage, NavParams, ToastController} from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ViewController } from 'ionic-angular';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modify-modal',
  templateUrl: 'modify-modal.html',
})
export class ModifyModalPage {
    modifiedUser = {
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
        children: "",
        couple: false,
        secondLastName: "",
        secondFirstName: ""
    }
    private userKey: string;

  constructor(public toastCtrl: ToastController, public navParams: NavParams, public userService: UserServiceProvider, public viewCtrl: ViewController, public events: Events) {
      this.modifiedUser = {
        lastName: navParams.get('lastName'),
        firstName: navParams.get('firstName'),
        coming: navParams.get('coming'),
        apero: navParams.get('apero'),
        meal: navParams.get('meal'),
        brunch: navParams.get('brunch'),
        children: navParams.get('children'),
        couple: navParams.get('couple'),
        secondLastName: navParams.get('secondLastName'),
        secondFirstName: this.navParams.get('secondFirstName')
    }
    this.userKey = navParams.get('$key')
  }

    updateUser() {
      this.userService.modifyUser(this.modifiedUser, this.userKey).then(_ => {
        let toast = this.toastCtrl.create({
          message: this.modifiedUser.lastName + " " + this.modifiedUser.firstName + (!this.modifiedUser.couple ? " a été modifié" :
            " et " + this.modifiedUser.secondLastName + " " + this.modifiedUser.secondFirstName + " ont été modifié"),
          duration: 3000,
          position: 'top'
        });

        toast.present();
        this.viewCtrl.dismiss();
      })
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }

  ionViewDidLoad() {
  }

}
