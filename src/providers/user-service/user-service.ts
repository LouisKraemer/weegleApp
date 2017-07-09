import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
@Injectable()
export class UserServiceProvider {
    
//    private apiUrl = 'http://localhost:3000/api';
    private apiUrl = 'http://server-weegle.herokuapp.com/api';
    data: any;

  constructor(public http: Http) {
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
    
    addUser(user) {
        return new Promise((resolve, reject) => {
            this.http.post(this.apiUrl+'/users', user)
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
    
    modifyUser(user) {
        return new Promise((resolve, reject) => {
            this.http.put(this.apiUrl + '/users/' + user._id, user)
            .subscribe(res => {
                resolve(res);
            }, (err) => {
                reject(err);
            })
        })
    }
    
    findUserById(userId) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + '/users/' + userId)
                .map(res => res.json())
                .subscribe(data => {
                this.data = data;
                resolve(this.data);
            })
        })
    }
}
