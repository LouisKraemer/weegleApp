import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AddUserPage } from '../add-user/add-user';
import { ModifyModalPage } from '../modify-modal/modify-modal';
import { Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [UserServiceProvider]
})
export class HomePage {
    public user: any;
    private updateUser: any;
    search = "";
    filter = "all";

  constructor(public navCtrl: NavController, public userService: UserServiceProvider, public actionSheetCtrl: ActionSheetController, public platform: Platform, public modalCtrl: ModalController, public events: Events, private toastCtrl: ToastController) {
      events.subscribe('addedUser', (lastName, firstName) => {
          this.getUsers();
          this.presentToast('add', lastName, firstName);
      });
      events.subscribe('modifiedUser', (lastName, firstName) => {
          this.getUsers();
          this.presentToast('modify', lastName, firstName);
      })
      this.getUsers();
  }
    
//    ionViewDidLoad() {
//        this.getUsers();
//  }
    
    presentToast(action, lastName, firstName) {
        let message = '';
        if(action == 'add') {
            message = lastName + ' ' + firstName + ' a été invité'
        } else if (action == 'modify') {
            message = lastName + ' ' + firstName + ' a été modifié'
        } else {
            message = lastName + ' ' + firstName + ' a été supprimé'
        }
        
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });
        
        toast.present();
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
    
    presentUserModal(updateUser) {
        let userModal = this.modalCtrl.create(ModifyModalPage, { userId: updateUser._id,
                                                                lastName: updateUser.lastName,
                                                                firstName: updateUser.firstName,
                                                                coming: updateUser.coming,
                                                                aperoInvited: updateUser.apero.invited,
                                                                aperoComing: updateUser.apero.coming,
                                                                mealInvited: updateUser.meal.invited,
                                                                mealComing: updateUser.meal.coming,
                                                                brunchInvited: updateUser.brunch.invited,
                                                                brunchComing: updateUser.brunch.coming,
                                                                children: updateUser.children
                                                               });
        userModal.present();
    }
    
    presentActionSheet(targetId, lastName, firstName) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Que voulez-vous faire ?',
            buttons: [
            {
                text: 'Supprimer',
                role: 'destructive',
                icon: !this.platform.is('ios') ? 'trash' : null,
                handler: () => {
                    this.userService.deleteUser(targetId).then(result => {
                        this.getUsers();
                        this.presentToast('delete', lastName, firstName);
                    });
                }
            },
            {
                text: 'Modifier',
                icon: !this.platform.is('ios') ? 'create' : null,
                handler: () => {
                    this.userService.findUserById(targetId)
                        .then(updateUser => {
                        this.updateUser = updateUser;
                        this.presentUserModal(this.updateUser);
                    })
                }
            },
            {
                text: 'Annuler',
                role: 'cancel',
                icon: !this.platform.is('ios') ? 'close' : null,
                handler: () => {
                }
            }
            ]
        });

        actionSheet.present();
    }
    
    filterActionSheet() {
        console.log('test')
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Filtrer',
            buttons: [
            {
                text: 'Tout le monde',
//                icon: !this.platform.is('ios') ? 'trash' : null,
                handler: () => {
                    this.filter = "all";
                }
            },
            {
                text: 'Présent',
                handler: () => {
                    this.filter = "coming";
                }
            },
            {
                text: 'Sans réponse',
                handler: () => {
                    this.filter = "noAnswer"
                }
            },
            {
                text: 'Annuler',
                role: 'cancel',
//                icon: !this.platform.is('ios') ? 'close' : null,
                handler: () => {
                }
            }
            ]
        });

        actionSheet.present();
    }   

}
