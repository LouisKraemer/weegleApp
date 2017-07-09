import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modify-modal',
  templateUrl: 'modify-modal.html',
})
export class ModifyModalPage {
    modifiedUser = {
        _id: "",
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
        }
    }

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider, public viewCtrl: ViewController) {
      this.modifiedUser = {
          _id: navParams.get('userId'),
        lastName: navParams.get('lastName'),
        firstName: navParams.get('firstName'),
        coming: navParams.get('coming'),
        apero: {
            invited: navParams.get('aperoInvited'),
            coming: navParams.get('aperoComing')
        },
        meal: {
            invited: navParams.get('mealInvited'),
            coming: navParams.get('mealComing')
        },
        brunch: {
            invited: navParams.get('brunchInvited'),
            coming: navParams.get('brunchComing')
        }
    }
  }
    
    updateUser() {
        this.userService.modifyUser(this.modifiedUser);
        this.viewCtrl.dismiss();
    }

  ionViewDidLoad() {
  }

}
