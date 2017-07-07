import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AddUserPage } from '../add-user/add-user';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [UserServiceProvider]
})
export class HomePage {
    public user: any;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider) {
      this.getUsers();
  }
    
    getUsers() {
        this.userService.getUsers()
            .subscribe(
                result => console.log(result)
//                error => this.errorMessage = <any>error
        )
//            .then(data => {
//            this.user = data;
//        });
    }
    
    addClicked() {
        this.navCtrl.push(AddUserPage);
    }

}
