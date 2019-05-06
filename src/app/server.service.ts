import { Injectable } from '@angular/core';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  get_reservation(): string {
    let response = '';

    $.ajax({
      url: 'http://localhost:6999/',
      type: 'get',
      async: false,
      data: {
      },
      success(data) {
        response = data;
      }

    });

    return response;
  }

  constructor() {
  }
}
