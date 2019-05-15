import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  get_resources_names() {

    return this.http.get('http://localhost:6999/');
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
}
