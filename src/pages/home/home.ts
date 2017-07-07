import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AddUserPage } from '../add-user/add-user';
import { ActionSheetController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [UserServiceProvider]
})
export class HomePage {
    public user: any;

  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public actionSheetCtrl: ActionSheetController) {
      this.getUsers();
  }
    
    getUsers() {
        this.userService.getUsers()
            .then(data => {
            this.user = data;
        });
    }
    
    addClicked() {
        this.navCtrl.push(AddUserPage);
    }
    
    doRefresh(refresher) {
        this.userService.getUsers()
            .then(data => {
            this.user = data;
            refresher.complete();
        });
    }
    
    presentActionSheet(event) {
        const targetId = event.target.parentElement.id;
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Que voulez-vous faire ?',
            buttons: [
            {
                text: 'Supprimer',
                role: 'destructive',
                handler: () => {
                    this.userService.deleteUser(targetId);
                    this.getUsers();
                }
            },
            {
                text: 'Modifier',
                handler: () => {
                }
            },
            {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                }
            }
            ]
        });

        actionSheet.present();
    }   

}
