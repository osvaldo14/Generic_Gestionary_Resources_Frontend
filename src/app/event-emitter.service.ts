import {EventEmitter, Injectable} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {

  invokeCalendarReservationFunction = new EventEmitter();
  subsVar: Subscription;

  invokeCreateResourceFunction = new EventEmitter();

  constructor() { }

  onCreateReservationButtonClick() {
    this.invokeCalendarReservationFunction.emit();
  }

  onCreateResourceButtonClick() {
    this.invokeCreateResourceFunction.emit();
  }
}
