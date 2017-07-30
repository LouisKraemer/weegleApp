import { Component } from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';
import { AddUserPage } from '../add-user/add-user';
import { ModifyModalPage } from '../modify-modal/modify-modal';
import { Platform, ActionSheetController, ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html',
    providers: [UserServiceProvider]
})
export class HomePage {
    public users: any;
    search = "";
    filter = "all";

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public userService: UserServiceProvider, public actionSheetCtrl: ActionSheetController, public platform: Platform, public modalCtrl: ModalController, private toastCtrl: ToastController) {
  }

   ionViewDidLoad() {
       this.users = this.userService.getUsers();
 }

    presentToast(message) {

        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });

        toast.present();
    }

    addClicked() {
        this.navCtrl.push(AddUserPage);
    }

    presentUserModal(updateUser) {
      let userModal = this.modalCtrl.create(ModifyModalPage, updateUser);
      userModal.present();
    }

    presentActionSheet(user) {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Que voulez-vous faire ?',
            buttons: [
            {
                text: 'Supprimer',
                role: 'destructive',
                icon: !this.platform.is('ios') ? 'trash' : null,
                handler: () => {
                  // this.presentConfirmDelete(user);
                  this.userService.deleteUser(user.$key).then(_ => {
                    let toast = this.toastCtrl.create({
                      message: user.lastName + " " + user.firstName + " a été supprimé",
                      duration: 3000,
                      position: 'top'
                    });

                    toast.present();
                  })
                }
            },
            {
                text: 'Modifier',
                icon: !this.platform.is('ios') ? 'create' : null,
                handler: () => {
                  this.presentUserModal(user);
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

  // presentConfirmDelete(user) {
  //   let alert = this.alertCtrl.create({
  //     message: 'Are you sure to delete ?',
  //     buttons: [{
  //       text: 'Cancel',
  //       role: 'cancel',
  //       handler: () => {
  //       }
  //     },
  //       {
  //         text: 'Delete',
  //         handler: () => {
  //           this.userService.deleteUser(user.$key).then(_ => {
  //             this.presentToast('delete', user.lastName, user.firstName);
  //           })
  //         }
  //       }]
  //   });
  //   alert.present();
  // }

    filterActionSheet() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Filtrer',
            buttons: [
            {
                text: 'Tout le monde',
               // icon: !this.platform.is('ios') ? 'trash' : null,
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
