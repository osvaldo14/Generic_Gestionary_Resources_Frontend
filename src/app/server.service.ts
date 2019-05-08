import {Injectable} from '@angular/core';
import * as $ from 'jquery';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  get_reservation() {

    return this.http.get('http://localhost:6999/');
  }

  create_resource(resource) {

    return this.http.post('http://localhost:6999/CreateResource', resource);

  }

  constructor(private http: HttpClient) {
  }

  get_resource_by_type() {

    return this.http.get('http://localhost:6999/resourcebytype');

  }
}
