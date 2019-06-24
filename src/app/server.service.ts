import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';
import {Reservation} from './interface/Reservation';
import {BehaviorSubject, config} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from './interface/User';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth-guard';
import {FormControl} from '@angular/forms';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';

export interface MyEvent extends CalendarEvent {
  id: number;
  title: string;
  resources: string[];
  start: Date;
  end: Date;
  color: any;
  draggable: true;
  resizable: {
    beforeStart: true,
    afterEnd: true
  };
  ressourcesFormControl: FormControl;
}


@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private messageSource = new BehaviorSubject<string>('default value');
  currentMessage = this.messageSource.asObservable();
  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  private events = new BehaviorSubject<MyEvent[]>([]);
  event = this.events.asObservable();
  addEvent(e: MyEvent) {
    this.events.value.push(e);
  }

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
    console.log(reservation);
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
