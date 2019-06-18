import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import {Reservation} from './interface/Reservation';
import {config} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './interface/User';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  get_resources_names() {

    return this.http.get('http://localhost:6999/');
  }

  get_resources() {
    return this.http.get('http://localhost:6999/resources');
  }

  create_resource(r) {

    return this.http.post('http://localhost:6999/CreateResource', r);

  }

  constructor(private http: HttpClient) {
  }

  get_resource_by_type() {

    return this.http.get('http://localhost:6999/resourcebytype');

  }

  create_reservation(res) {

    return this.http.post('http://localhost:6999/createreservation', res);

  }

  get_reservation_list() {

    return this.http.get('http://localhost:6999/getreservationlist');

  }

  create_resource_type(type) {

    return this.http.post('http://localhost:6999/types', type);

  }

  get_resource_types() {
    return this.http.get('http://localhost:6999/gtypes');
  }

  delete_reservation(reservation) {
    return this.http.post('http://localhost:6999/deletereservation', reservation);
  }

  delete_resource(resource) {
    return this.http.post('http://localhost:6999/deleteresource', resource);
  }

  conflict() {
    return this.http.get('http://localhost:6999/conflict');
  }

  login(username: string, password: string) {
    return this.http.post<any>(`http:localhost:6999/users/authenticate`, {username, password})
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }

        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

  getAll() {
    return this.http.get<User[]>(`http:localhost:4200/users`);
  }
}
