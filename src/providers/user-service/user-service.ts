import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UserServiceProvider {
    
    private apiUrl = 'http://localhost:3000/api';
    data: any;

  constructor(public http: Http) {
//    console.log('Hello UserServiceProvider Provider');
  }
    
//    getUsers() {
//        if (this.data) {
//            return Promise.resolve(this.data);
//        }
//        
//        return new Promise(resolve => {
//            this.http.get(this.apiUrl + '/users')
//                .map(res => res.json())
//                .subscribe(data => {
//                this.data = data;
//                resolve(this.data);
//            })
//        })
//    }

    getUsers() : Observable<any> {
        return this.http.get(this.apiUrl + '/users')
            .map((res:Response) => res.json())
            .catch((error:any) => Observable.throw(error.json().error || 'Server error'));
    }

    addUser(user) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.post(this.apiUrl + '/users', user, options)
            .map(res => res.json())
    }

}
