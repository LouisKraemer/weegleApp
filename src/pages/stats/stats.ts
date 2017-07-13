import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service';

/**
 * Generated class for the StatsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-stats',
  templateUrl: 'stats.html',
})
export class StatsPage {
    
    public users: any;
    
    userCount = 0;
    comingCount = 0;
    answerCount = 0;
    aperoCount = 0;
    aperoComingCount = 0;
    mealCount = 0;
    mealComingCount = 0;
    brunchCount = 0;
    brunchComingCount = 0;
    childrenCount = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserServiceProvider) {
      this.getUsers();
  }
    
    getUsers() {
        this.userService.getUsers()
            .then(data => {
            this.users = data;
            this.count(this.users);
        });
    }
    
    doRefresh(refresher) {
        this.userService.getUsers()
            .then(data => {
            this.users = data;
            this.count(this.users);
            refresher.complete();
        });
    }
    
    count(users) {
        this.userCount = 0;
        this.comingCount = 0;
        this.answerCount = 0;
        this.aperoCount = 0;
        this.mealCount = 0;
        this.brunchCount = 0;
        this.aperoComingCount = 0;
        this.mealComingCount = 0;
        this.brunchComingCount = 0;
        this.childrenCount = 0;
        
        for (var i in users) {
            this.userCount++;
            if (users[i].answered) {
                this.answerCount++;
                if (users[i].coming) {
                    this.comingCount++;
                    this.childrenCount = this.childrenCount + Number(users[i].children);
                    if (users[i].apero.invited) {
                        this.aperoCount++;
                        if(users[i].apero.coming) {
                            this.aperoComingCount++;
                        }
                    }
                    if (users[i].meal.invited) {
                        this.mealCount++;
                        if(users[i].meal.coming) {
                            this.mealComingCount++;
                        }
                    }
                    if (users[i].brunch.invited) {
                        this.brunchCount++;
                        if(users[i].brunch.coming) {
                            this.brunchComingCount++;
                        }
                    }
                }
            }
        }
    }

  ionViewDidLoad() {
//    console.log('ionViewDidLoad StatsPage');
  }

}
