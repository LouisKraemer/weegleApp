import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
//import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
//import 'rxjs/add/operator/catch';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
    
    private apiUrl = 'http://localhost:3000/api';
//    private apiUrl = 'http://server-weegle.herokuapp.com/api';
    data: any;

  constructor(public http: Http) {
//    console.log('Hello UserServiceProvider Provider');
  }
    
    getUsers() {
//        if (this.data) {
//            return Promise.resolve(this.data);
//        }
        
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/users')
                .map(res => res.json())
                .subscribe(data => {
                this.data = data;
                resolve(this.data);
            })
        })
    }
    
    addUser(lastName, firstName, coming) {
        var data = {
            lastName: lastName,
            firstName: firstName,
            coming: coming
        }
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/users', data)
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            });
        });
    }
    
    deleteUser(userId) {
        return new Promise((resolve, reject) => {
            this.http.delete(this.apiUrl + '/users/' + userId)
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }
}
