import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
import {AngularFireDatabase} from "angularfire2/database";
@Injectable()
export class UserServiceProvider {

  constructor(public http: Http, public db: AngularFireDatabase) {
  }

  getUsers() {
    return this.db.list('/users');
  }

  addUser(user) {
    user.answered = user.coming;
    return this.db.list('/users').push(user);
  }

  deleteUser(userKey) {
    return this.db.object('/users/' + userKey).remove();
  }

  modifyUser(updatedData, userKey) {
    updatedData.answered = true;
    return this.db.object('/users/' + userKey).update(updatedData);
  }
}
